import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/markets - Get all markets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const focus = searchParams.get('focus')
    const active = searchParams.get('active')

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { chineseName: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (focus) {
      where.researchFocus = { contains: focus, mode: 'insensitive' }
    }

    if (active !== null) {
      where.isActive = active === 'true'
    }

    // Execute query with pagination
    const skip = (page - 1) * limit
    const [markets, total] = await Promise.all([
      prisma.market.findMany({
        where,
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
        include: {
          vendors: {
            include: {
              vendor: {
                select: {
                  id: true,
                  name: true,
                  chineseName: true,
                },
              },
            },
          },
        },
      }),
      prisma.market.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: markets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/markets error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch markets' },
      { status: 500 }
    )
  }
}

// POST /api/markets - Create a new market
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'id',
      'name',
      'chineseName',
      'location',
      'latitude',
      'longitude',
      'established',
      'researchFocus',
      'description',
      'analyticalNote',
      'keyFindings',
      'image',
    ]

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if market with same ID already exists
    const existingMarket = await prisma.market.findUnique({
      where: { id: body.id },
    })

    if (existingMarket) {
      return NextResponse.json(
        { success: false, error: 'Market with this ID already exists' },
        { status: 409 }
      )
    }

    // Create market
    const market = await prisma.market.create({
      data: {
        id: body.id,
        name: body.name,
        chineseName: body.chineseName,
        location: body.location,
        latitude: parseFloat(body.latitude),
        longitude: parseFloat(body.longitude),
        established: body.established,
        researchFocus: body.researchFocus,
        description: body.description,
        analyticalNote: body.analyticalNote,
        keyFindings: body.keyFindings,
        image: body.image,
        isActive: body.isActive ?? true,
      },
      include: {
        vendors: {
          include: {
            vendor: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: market }, { status: 201 })
  } catch (error) {
    console.error('POST /api/markets error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create market' },
      { status: 500 }
    )
  }
}
