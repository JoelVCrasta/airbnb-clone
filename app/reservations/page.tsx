import { getSession } from "@/lib/auth/get_session"
import { getReservations } from "../actions/getReservations"
import ClientOnly from "@/components/ClientOnly"
import EmptyBox from "@/components/EmptyBox"
import Reservations from "@/components/reservation/ReservationsClient"

const ReservationsPage = async () => {
  const session = await getSession()

  if (!session?.user) {
    return (
      <ClientOnly>
        <EmptyBox title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    authorId: session.user.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyBox
          title="No reservation Found"
          subtitle="Looks like you have no reservations on your property"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Reservations reservations={reservations} />
    </ClientOnly>
  )
}

export default ReservationsPage
