import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/vendors/[id] - Get a specific vendor
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: {
        markets: {
          include: {
            market: {
              select: {
                id: true,
                name: true,
                chineseName: true,
                location: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
      },
    })

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: vendor,
    })
  } catch (error) {
    console.error(`GET /api/vendors/[id] error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendor' },
      { status: 500 }
    )
  }
}

// PUT /api/vendors/[id] - Update a specific vendor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Check if vendor exists
    const existingVendor = await prisma.vendor.findUnique({
      where: { id },
    })

    if (!existingVendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Update vendor
    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        name: body.name,
        chineseName: body.chineseName,
        description: body.description,
        specialties: body.specialties,
        latitude: body.latitude ? parseFloat(body.latitude) : undefined,
        longitude: body.longitude ? parseFloat(body.longitude) : undefined,
        images: body.images,
        contactPhone: body.contactPhone,
        contactInstagram: body.contactInstagram,
        contactFacebook: body.contactFacebook,
        contactLine: body.contactLine,
        operatingHours: body.operatingHours,
        researchNotes: body.researchNotes,
        culturalSignificance: body.culturalSignificance,
        isActive: body.isActive,
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
                latitude: true,
                longitude: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: vendor,
    })
  } catch (error) {
    console.error(`PUT /api/vendors/[id] error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to update vendor' },
      { status: 500 }
    )
  }
}

// DELETE /api/vendors/[id] - Delete a specific vendor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if vendor exists
    const existingVendor = await prisma.vendor.findUnique({
      where: { id },
    })

    if (!existingVendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Soft delete by setting isActive to false
    const vendor = await prisma.vendor.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Vendor deleted successfully',
      data: vendor,
    })
  } catch (error) {
    console.error(`DELETE /api/vendors/[id] error:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete vendor' },
      { status: 500 }
    )
  }
}
