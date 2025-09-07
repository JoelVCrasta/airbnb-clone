import prisma from "@/db"

interface Params {
  listingId?: string
}

export const getListingById = async (params: Params) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
