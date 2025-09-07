"use client"

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/utils/types"
import React, { useMemo } from "react"
import Heading from "../Heading"
import HeartButton from "../HeartButton"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface IListingHeadProps {
  title: string
  imageUrls: string[]
  location: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead = ({
  title,
  imageUrls,
  location,
  currentUser,
  id,
}: IListingHeadProps) => {
  const { getByValue } = useCountries()
  const loc = useMemo(() => getByValue(location), [getByValue, location])

  const hasMultipleImages = imageUrls.length > 1

  return (
    <div className="mt-6">
      {/* Heading */}
      <Heading title={title} subtitle={`${loc?.label}, ${loc?.region}`} />

      {/* Carousel */}
      <div className="w-full h-[60vh] rounded-xl overflow-hidden relative mt-4">
        <Carousel className="h-full">
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="h-[60vh] relative">
                <Image
                  alt={`listing image ${index + 1}`}
                  src={url}
                  fill
                  className="object-cover w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* show only if multiple images exist */}
          {hasMultipleImages && (
            <>
              <CarouselPrevious className="left-3 bg-white/70 hover:bg-white rounded-full shadow-md" />
              <CarouselNext className="right-3 bg-white/70 hover:bg-white rounded-full shadow-md" />
            </>
          )}
        </Carousel>

        {/* Heart button */}
        <div className="absolute top-5 right-5 z-10">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default ListingHead
