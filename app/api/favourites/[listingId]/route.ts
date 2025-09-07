import prisma from "@/db"
import { getSession } from "@/lib/auth/get_session"
import { NextRequest, NextResponse } from "next/server"

type Context = {
  params: Promise<{ listingId: string }>
}

export async function POST(
  res: NextRequest,
  context: Context
): Promise<NextResponse> {
  try {
    const { listingId } = await context.params
    const session = await getSession()
    const currentUser = session?.user

    if (!currentUser) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 })
    }

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 })
    }

    // Add the listingId to the user's favouriteIds
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        favouriteIds: {
          push: listingId,
        },
      },
    })

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const { listingId } = await context.params
    const session = await getSession()
    const currentUser = session?.user

    if (!currentUser) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 })
    }

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 })
    }

    let updatedFavouriteIds = [...(currentUser.favouriteIds || [])]
    updatedFavouriteIds = updatedFavouriteIds.filter((id) => id !== listingId)

    // Remove the listingId from the user's favouriteIds
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        favouriteIds: updatedFavouriteIds,
      },
    })

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
