import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useCountries from "@/app/hooks/useCountries"
import { SafeUserFromPrisma } from "@/utils/types"
import { IconType } from "react-icons"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../Map"), {
  ssr: false,
})

interface ListingInfoProps {
  user: SafeUserFromPrisma
  category?: {
    icon: IconType
    label: string
    description: string
  }
  bathroomCount: number
  guestCount: number
  roomCount: number
  description: string
  location: string
}

const ListingInfo = ({
  user,
  category,
  bathroomCount,
  guestCount,
  roomCount,
  description,
  location,
}: ListingInfoProps) => {
  const { getCoordsByValue } = useCountries()
  const cordinates = getCoordsByValue(location)

  return (
    <div className="col-span-4 flex flex-col gap-4 my-4">
      <div className="flex flex-col gap-2 ">
        <div className="text-lg font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="flex flex-row items-center gap-3 font-light text-sm text-neutral-500">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
          </div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      {/* <Map center={cordinates} /> */}
    </div>
  )
}

export default ListingInfo
