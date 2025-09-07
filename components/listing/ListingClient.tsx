"use client"

import {
  SafeListing,
  SafeReservation,
  SafeUser,
  SafeUserFromPrisma,
} from "@/utils/types"
import { categories } from "@/components/navbar/Categories"
import { useCallback, useEffect, useMemo, useState } from "react"
import ListingHead from "./ListingHead"
import Container from "../Container"
import ListingInfo from "./ListingInfo"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { toast } from "sonner"
import ListingReservation from "./ListingReservation"
import { DateRange } from "react-day-picker"

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {
    user: SafeUserFromPrisma
  }
  currentUser?: SafeUser | null
}

const initialDateRange = {
  from: new Date(),
  to: new Date(),
}

const ListingClient = ({
  reservations = [],
  listing,
  currentUser,
}: ListingClientProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange)

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const start = new Date(reservation.checkIn)
      const end = new Date(reservation.checkOut)
      const range = eachDayOfInterval({ start, end })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const handleReservation = useCallback(() => {
    if (!currentUser) {
      return router.push("/signup")
    }

    setLoading(true)
    console.log("Posting reservation", dateRange)

    axios
      .post("/api/reservation", {
        listingId: listing.id,
        totalPrice,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
      })
      .then(() => {
        toast.success("Reservation created successfully")
        setDateRange(initialDateRange)
        router.refresh()
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [totalPrice, dateRange, listing.id, currentUser, router])

  // Calculate total price based on date range
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const dayCount = differenceInCalendarDays(dateRange.to, dateRange.from)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <ListingHead
          id={listing.id}
          title={listing.title}
          imageUrls={listing.imageUrls}
          location={listing.location}
          currentUser={currentUser}
        />

        <div className="grid grid-cols-1 md:grid-cols-7 gap-y-4 md:gap-10 mt-8">
          <ListingInfo
            user={listing.user}
            category={categories.find((c) => c.label === listing.category)}
            bathroomCount={listing.bathroomCount}
            guestCount={listing.guestCount}
            roomCount={listing.roomCount}
            description={listing.description}
            location={listing.location}
          />

          <div className="order-first md-10 md:order-last md:col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={handleReservation}
              disabled={loading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
