"use client"
import Container from "@/components/Container"
import ListingCard from "@/components/ListingCard"
import { SafeListing, SafeUser } from "@/utils/types"
import React from "react"
import PageHeading from "../PageHeading"

interface FavoritesClientProps {
  currentUser: SafeUser
  listings: SafeListing[]
}

const FavoritesClient = ({ currentUser, listings }: FavoritesClientProps) => {
  return (
    <Container>
      <PageHeading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            listing={listing}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
