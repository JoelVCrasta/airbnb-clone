"use client"

/* import useFavorite from "@/app/hooks/useFavorite"
import { cn } from "@/app/utils/helper" */
import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: any | null
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  /* const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  }) */

  const hasFavorited = false
  const toggleFavorite = () => {
    console.log("toggleFavorite")
  }

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
