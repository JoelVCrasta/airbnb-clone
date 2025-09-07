"use client"
import { SafeListing, SafeUser } from "@/utils/types"
import PageHeading from "@/components/PageHeading"
import Container from "@/components/Container"
import ListingCard from "@/components/ListingCard"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"

interface IProperties {
  currentUser: SafeUser
  listings: SafeListing[]
}

const Properties = ({ currentUser, listings }: IProperties) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Listing deleted")
          router.refresh()
        })
        .catch((err) => {
          toast.error(err?.response?.data.error ?? "Something went wrong!")
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
        title="Listings"
        subtitle="Manage all of your properties that are listed"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            listing={listing}
            key={listing.id}
            onAction={onCancel}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  )
}

export default Properties
