import useFavourite from "@/app/hooks/useFavourite"
import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: any | null
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavourite({
    listingId,
    currentUser,
  })

  return (
    <div
      onClick={toggleFavorite}
      className={`
        relative hover:opacity-80 transition cursor-pointer
        ${hasFavorited && "heart-btn-animation"}
        `}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-0.5 -right-0.5"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500 " : "fill-neutral-500/70"}
      />
    </div>
  )
}

export default HeartButton
