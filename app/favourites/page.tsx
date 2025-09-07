import { getSession } from "@/lib/auth/get_session"
import ClientOnly from "@/components/ClientOnly"
import EmptyBox from "@/components/EmptyBox"
import FavoritesClient from "@/components/favourite/FavouritesClient"
import React from "react"
import { getFavourites } from "../actions/getFavourites"

const FavoritesPage = async () => {
  const session = await getSession()

  if (!session?.user) {
    return (
      <ClientOnly>
        <EmptyBox title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const favorites = await getFavourites()

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyBox
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={session.user} />
    </ClientOnly>
  )
}

export default FavoritesPage
