"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryProps {
  label: string
  icon: IconType
  description?: string
  selected?: boolean
}

const Category = ({ label, icon: Icon, selected }: CategoryProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let curQuery = {}

    if (params) {
      curQuery = qs.parse(params.toString())
    }

    const updatedQuery: Record<string, string | string[]> = {
      ...curQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center 
        gap-2 p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer 
        ${selected ? "border-b-neutral-800" : "border-b-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default Category
