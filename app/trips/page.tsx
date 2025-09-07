import { getSession } from "@/lib/auth/get_session"
import { getReservations } from "@/app/actions/getReservations"
import ClientOnly from "@/components/ClientOnly"
import EmptyBox from "@/components/EmptyBox"
import TripsClient from "@/components/trips/TripsClient"
import React from "react"

const TripsPage = async () => {
  const session = await getSession()

  if (!session?.user) {
    return (
      <ClientOnly>
        <EmptyBox title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: session.user.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyBox
          title="No trips Found"
          subtitle="Looks like you have not reserved any trips"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} />
    </ClientOnly>
  )
}

export default TripsPage
