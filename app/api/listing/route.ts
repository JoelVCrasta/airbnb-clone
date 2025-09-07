import { NextRequest, NextResponse } from "next/server"
import { rentServerSchema } from "@/utils/zod/rent-schema"
import prisma from "@/db"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const parsed = rentServerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message, success: false },
        { status: 400 }
      )
    }

    const {
      userId,
      title,
      description,
      imageUrls,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      price,
      location,
    } = parsed.data

    const listing = await prisma.listing.create({
      data: {
        userId,
        title,
        description,
        imageUrls,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location: location.value,
      },
    })

    return NextResponse.json({ listing, success: true }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    )
  }
}
