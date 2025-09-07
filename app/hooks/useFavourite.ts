import { SafeUser } from "@/utils/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { toast } from "sonner"

interface UseFavourite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavourite = ({ listingId, currentUser }: UseFavourite) => {
  const router = useRouter()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favouriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return router.push("/signup")
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favourites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`)
        }

        await request()
        router.refresh()

        if (hasFavorited) {
          toast.success("Removed from favourites")
        } else {
          toast.success("Added to favourites")
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    },
    [currentUser, hasFavorited, listingId, router]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavourite
