import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/vendors - Get all vendors with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const marketId = searchParams.get('marketId') || ''
    const specialty = searchParams.get('specialty') || ''
    const isActive = searchParams.get('isActive')

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { chineseName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { specialties: { has: search } },
      ]
    }

    if (marketId) {
      where.markets = {
        some: {
          marketId: marketId,
        },
      }
    }

    if (specialty) {
      where.specialties = { has: specialty }
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    // Get total count for pagination
    const total = await prisma.vendor.count({ where })

    // Get vendors with pagination
    const vendors = await prisma.vendor.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        markets: {
          include: {
            market: {
              select: {
                id: true,
                name: true,
                chineseName: true,
                location: true,
              },
            },
          },
        },
      },
    })

    // Debug logging
    console.log('API vendors response:', {
      total: vendors.length,
      vendorNames: vendors.map(v => v.name),
    })

    const shilinVendors = vendors.filter(v =>
      v.markets.some(m => m.market.id === 'shilin-night-market')
    )
    console.log(
      'Shilin vendors found:',
      shilinVendors.length,
      shilinVendors.map(v => v.name)
    )

    // Calculate pagination info
    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: vendors,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    })
  } catch (error) {
    console.error('GET /api/vendors error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}

// POST /api/vendors - Create a new vendor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const {
      name,
      chineseName,
      description,
      specialties,
      images,
      latitude,
      longitude,
      marketId,
      isActive = true,
    } = body

    if (!name || !marketId || !latitude || !longitude) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, marketId, latitude, longitude',
        },
        { status: 400 }
      )
    }

    // Verify market exists
    const market = await prisma.market.findUnique({
      where: { id: marketId },
    })

    if (!market) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      )
    }

    // Create vendor
    const vendor = await prisma.vendor.create({
      data: {
        name,
        chineseName,
        description,
        specialties: specialties || [],
        images: images || [],
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        markets: {
          create: {
            marketId: marketId,
          },
        },
        isActive,
      },
      include: {
        markets: {
          include: {
            market: {
              select: {
                id: true,
                name: true,
                chineseName: true,
                location: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: vendor,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/vendors error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create vendor' },
      { status: 500 }
    )
  }
}
