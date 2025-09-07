import prisma from "@/db"
import { SafeListing, SearchListingParams } from "@/utils/types"

export async function getListings(
  params: SearchListingParams
): Promise<SafeListing[]> {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      checkIn,
      checkOut,
      location,
      category,
    } = params

    const query: any = {}
    if (userId) {
      query.userId = userId
    }
    if (category) {
      query.category = category
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }
    if (location) {
      query.location = location
    }
    if (checkIn && checkOut) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: checkIn },
                startDate: { lte: checkIn },
              },
              {
                startDate: { lte: checkOut },
                endDate: { gte: checkOut },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }))

    return safeListings
  } catch (error) {
    console.error(error)
    return []
  }
}
