"use client"

import useCountries from "@/app/hooks/useCountries"
import useSearchModal from "@/app/hooks/useSearchModal"
import { differenceInDays } from "date-fns"
import { useSearchParams } from "next/navigation"
import React, { useMemo } from "react"
import { BiSearch } from "react-icons/bi"

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const { getByValue } = useCountries()
  const location = params?.get("location")
  const checkIn = params?.get("checkIn")
  const checkOut = params?.get("checkOut")
  const guestCount = params?.get("guestCount")

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location as string)?.label
    }

    return "Anywhere"
  }, [location, getByValue])

  const durationLabel = useMemo(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn as string)
      const end = new Date(checkOut as string)
      let diff = differenceInDays(end, start)

      if (diff === 0) {
        diff = 1
      }

      return `${diff} ${diff > 1 ? "Days" : "Day"}`
    }

    return "Any Week"
  }, [checkIn, checkOut])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return "Add Guests"
  }, [guestCount])

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              p-2 
              bg-neutral-800
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
