import prisma from "@/db"
import { getSession } from "@/lib/auth/get_session"
import { NextResponse } from "next/server"

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to make a reservation." },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { listingId, checkIn, checkOut, totalPrice } = body

    if (!listingId || !checkIn || !checkOut || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      )
    }

    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: session.user.id,
            checkIn,
            checkOut,
            totalPrice,
          },
        },
      },
    })

    return NextResponse.json({ listingAndReservation }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
