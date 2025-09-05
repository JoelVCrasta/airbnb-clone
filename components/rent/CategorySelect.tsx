"use client"

import { IconType } from "react-icons"

interface CategoryItemProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const CategorySelect = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryItemProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex items-center p-4 border-2 gap-3 rounded-xl hover:border-black transition cursor-pointer 
        ${selected ? "border-black" : "border-neutral-300"}
        `}
    >
      <Icon size={30} />

      <div>
        <p className="text-sm font-semibold">{label}</p>
      </div>
    </div>
  )
}

export default CategorySelect
