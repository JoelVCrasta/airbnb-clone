import prisma from "@/db"
import { getSession } from "@/lib/auth/get_session"
import { NextRequest, NextResponse } from "next/server"

interface Params {
  listingId: string
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to delete a listing." },
        { status: 401 }
      )
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID." },
        { status: 400 }
      )
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ listing }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
