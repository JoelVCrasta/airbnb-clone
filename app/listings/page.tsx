import { getSession } from "@/lib/auth/get_session"
import ClientOnly from "@/components/ClientOnly"
import EmptyBox from "@/components/EmptyBox"
import ListingsClient from "./ListingsClient"
import { getListings } from "../actions/getListings"

const ListingsPage = async () => {
  const session = await getSession()

  if (!session?.user) {
    return (
      <ClientOnly>
        <EmptyBox title="Unauthroized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const properties = await getListings({
    userId: session.user.id,
  })

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyBox
          title="No listings found"
          subtitle="Looks like you don't have any properties listed."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingsClient currentUser={session.user} listings={properties} />
    </ClientOnly>
  )
}

export default ListingsPage
