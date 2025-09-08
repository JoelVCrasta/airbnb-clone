"use client"
import React, { useCallback, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import qs from "query-string"
import { CountrySelectType } from "@/utils/types"
import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "@/components/modal/Modal"
import { formatISO } from "date-fns"
import Heading from "@/components/Heading"
import CountrySelect from "@/components/rent/CountrySelect"
import CounterInput from "@/components/rent/CountInput"
import { DateRange } from "react-day-picker"
import { Calendar } from "../ui/calendar"
import useCountries from "@/app/hooks/useCountries"

enum STEPS {
  LOCATION = 0,
  DATE,
  INFO,
}

const SearchModal = () => {
  const searchModal = useSearchModal()
  const router = useRouter()
  const params = useSearchParams()
  const { getCoordsByValue } = useCountries()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectType>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  })

  const Map = useMemo(
    () => dynamic(() => import("@/components/Map"), { ssr: false }),
    [location]
  )

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.from) {
      updatedQuery.checkIn = formatISO(dateRange.from)
    }
    if (dateRange.to) {
      updatedQuery.checkOut = formatISO(dateRange.to)
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()

    router.push(url)
  }, [
    step,
    onNext,
    params,
    router,
    location,
    roomCount,
    dateRange,
    guestCount,
    searchModal,
    bathroomCount,
  ])

  const buttonLabel = useMemo(
    () => (step === STEPS.INFO ? "Search" : "Next"),
    [step]
  )

  const secondaryButtonLabel = useMemo(
    () => (step === STEPS.LOCATION ? undefined : "Back"),
    [step]
  )

  const bodyContent = useMemo(() => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where do you wanna go?"
              subtitle="Find the perfect location!"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />
            <hr />
            <div className="min-h-[35vh]">
              <Map center={getCoordsByValue(location?.value ?? "")} />
            </div>
          </div>
        )

      case STEPS.DATE:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="When do you plan to go?"
              subtitle="Make sure everyone is free!"
            />
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(value) => {
                if (value) setDateRange(value)
              }}
              className="self-center md:w-1/2"
            />
          </div>
        )

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="More information"
              subtitle="Find your perfect place!"
            />
            <CounterInput
              onChange={setGuestCount}
              title="Guests"
              subTitle="How many guests are coming?"
              value={guestCount}
            />
            <CounterInput
              onChange={setRoomCount}
              title="Rooms"
              subTitle="How many rooms do you need?"
              value={roomCount}
            />
            <CounterInput
              onChange={setBathroomCount}
              title="Bathrooms"
              subTitle="How many bathrooms do you need?"
              value={bathroomCount}
            />
          </div>
        )
    }
  }, [step, Map, location, dateRange, guestCount, roomCount, bathroomCount])

  return (
    <Modal
      title="Filters"
      buttonLabel={buttonLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      isOpen={searchModal.isOpen}
      secondaryButton={step === STEPS.LOCATION ? undefined : onBack}
      secondaryButtonLabel={secondaryButtonLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal
