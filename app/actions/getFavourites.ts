import prisma from "@/db"
import { getSession } from "@/lib/auth/get_session"

export const getFavourites = async () => {
  try {
    const session = await getSession()

    if (!session?.user) {
      return []
    }

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(session.user.favouriteIds || [])],
        },
      },
    })

    const safeFavourites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toISOString(),
      updatedAt: favourite.updatedAt.toISOString(),
    }))

    return safeFavourites
  } catch (error: any) {
    throw new Error(error)
  }
}
