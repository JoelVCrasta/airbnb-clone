"use client"

import { Listing, Reservation } from "@/utils/types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCallback, MouseEvent, useMemo } from "react"
import { format } from "date-fns"
import HeartButton from "@/components/HeartButton"
import { Button } from "./ui/button"

interface ListingCardProps {
  listing: Listing
  currentUser?: any | null
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}

const ListingCard = ({
  listing,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}: ListingCardProps) => {
  const router = useRouter()

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return listing.price
  }, [reservation, listing.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const startDate = new Date(reservation.checkIn)
    const endDate = new Date(reservation.checkOut)

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listing/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="listing"
            src={listing.imageUrls[0]}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-lg">{listing.location}</div>

        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>

        <div className="flex items-center gap-1">
          <div className="semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && (
          <Button onAbort={handleCancel} disabled={disabled}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ListingCard
