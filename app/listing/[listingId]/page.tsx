import { getListingById } from "@/app/actions/getListingById"
import ClientOnly from "@/components/ClientOnly"
import EmptyBox from "@/components/EmptyBox"
import { getSession } from "@/lib/auth/get_session"
import ListingClient from "@/components/listing/ListingClient"
import { getReservations } from "@/app/actions/getReservations"

interface Params {
  listingId: string
}

const ListingPage = async ({ params }: { params: Params }) => {
  const resolvedParams = await params

  const [listing, reservations, session] = await Promise.all([
    getListingById(resolvedParams),
    getReservations(resolvedParams),
    getSession(),
  ])

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyBox />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={session?.user}
      />
    </ClientOnly>
  )
}

export default ListingPage
