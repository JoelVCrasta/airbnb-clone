import Categories from "@/components/navbar/Categories"
import ClientOnly from "@/components/ClientOnly"
import { SearchListingParams } from "@/utils/types"
import { getListings } from "./actions/getListings"
import { getSession } from "@/lib/auth/get_session"
import Container from "@/components/Container"
import EmptyBox from "@/components/EmptyBox"
import ListingCard from "@/components/ListingCard"

interface HomeProps {
  searchParams: SearchListingParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const resolvedSearchParams = await searchParams

  const [listings, session] = await Promise.all([
    getListings(resolvedSearchParams),
    getSession(),
  ])

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyBox reset />
      </ClientOnly>
    )
  }

  return (
    <>
      <ClientOnly>
        <Categories />
        <Container>
          <div className="pt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                currentUser={session?.user}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    </>
  )
}

export default Home
