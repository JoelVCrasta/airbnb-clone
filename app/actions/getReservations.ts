import prisma from "@/db"

interface GetReservationsParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export async function getReservations(params: GetReservationsParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }
    if (userId) {
      query.userId = userId
    }
    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      checkIn: reservation.checkIn.toISOString(),
      checkOut: reservation.checkOut.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}
