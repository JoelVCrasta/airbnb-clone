"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import { Button } from "./ui/button"

interface EmptyBoxProps {
  title?: string
  subtitle?: string
  reset?: boolean
}

const EmptyBox = ({
  title = "No matches found",
  subtitle = "Try another search or reset the filter",
  reset,
}: EmptyBoxProps) => {
  const router = useRouter()

  return (
    <div className="h-[550px] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4 flex justify-center">
        {reset && (
          <Button variant="outline" onClick={() => router.push("/")}>
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyBox
