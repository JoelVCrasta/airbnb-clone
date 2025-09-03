"use client"

import Container from "@/components/Container"
import Category from "@/components/navbar/Category"
import { TbBeach, TbMountain, TbPool, TbWindmill } from "react-icons/tb"
import { MdOutlineVilla } from "react-icons/md"
import { usePathname, useSearchParams } from "next/navigation"
import {
  GiBoatFishing,
  GiCastle,
  GiIsland,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
} from "react-icons/gi"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is near the beach",
  },
  {
    label: "Windmills",
    icon: TbWindmill,
    description: "This property has a view of windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Country",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is near a skiing resort",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping facilities",
  },
  {
    label: "Snowy",
    icon: BsSnow,
    description: "This property is in a snowy area",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barn",
    icon: MdOutlineVilla,
    description: "This property is in a barn",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((c) => (
          <Category
            key={c.label}
            label={c.label}
            selected={c.label === category}
            icon={c.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
