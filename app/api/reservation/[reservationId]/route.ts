import { getSession } from "@/lib/auth/get_session"
import prisma from "@/db"
import { NextRequest, NextResponse } from "next/server"

interface Params {
  reservationId?: string
}
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to delete a reservation." },
        { status: 401 }
      )
    }

    const { reservationId } = params
    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.json(
        { error: "Invalid reservation ID." },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
        OR: [
          { userId: session.user.id },
          { listing: { userId: session.user.id } },
        ],
      },
    })
    return NextResponse.json({ reservation }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
