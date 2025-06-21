import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/markets/[id] - Get a specific market
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const market = await prisma.market.findUnique({
      where: { id: params.id },
      include: {
        vendors: {
          select: {
            id: true,
            name: true,
            chineseName: true,
            description: true,
            specialties: true,
            images: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    })

    if (!market) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: market,
    })
  } catch (error) {
    console.error(`GET /api/markets/${params.id} error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market' },
      { status: 500 }
    )
  }
}

// PUT /api/markets/[id] - Update a specific market
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Check if market exists
    const existingMarket = await prisma.market.findUnique({
      where: { id: params.id },
    })

    if (!existingMarket) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      )
    }

    // Update market
    const market = await prisma.market.update({
      where: { id: params.id },
      data: {
        name: body.name,
        chineseName: body.chineseName,
        location: body.location,
        latitude: body.latitude ? parseFloat(body.latitude) : undefined,
        longitude: body.longitude ? parseFloat(body.longitude) : undefined,
        established: body.established,
        researchFocus: body.researchFocus,
        description: body.description,
        analyticalNote: body.analyticalNote,
        keyFindings: body.keyFindings,
        image: body.image,
        isActive: body.isActive,
      },
      include: {
        vendors: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: market,
    })
  } catch (error) {
    console.error(`PUT /api/markets/${params.id} error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to update market' },
      { status: 500 }
    )
  }
}

// DELETE /api/markets/[id] - Delete a specific market
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if market exists
    const existingMarket = await prisma.market.findUnique({
      where: { id: params.id },
    })

    if (!existingMarket) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      )
    }

    // Soft delete by setting isActive to false
    const market = await prisma.market.update({
      where: { id: params.id },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Market deleted successfully',
      data: market,
    })
  } catch (error) {
    console.error(`DELETE /api/markets/${params.id} error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete market' },
      { status: 500 }
    )
  }
}
