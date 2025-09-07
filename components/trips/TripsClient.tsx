"use client"

import Container from "@/components/Container"
import PageHeading from "@/components/PageHeading"
import ListingCard from "@/components/ListingCard"
import { SafeListing, SafeReservation, SafeUser } from "@/utils/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface TripsProps {
  reservations: (SafeReservation & { listing: SafeListing })[]
}

const TripsClient = ({ reservations }: TripsProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success("Reservation canceled")
          router.refresh()
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Something went wrong")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router]
  )

  return (
    <Container>
      <PageHeading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            actionId={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
