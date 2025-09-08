"use client"

import EmptyBox from "@/components/EmptyBox"
import { useEffect } from "react"

interface ErrorProps {
  error: Error
}

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyBox title="Something went wrong :(" subtitle={error.message} />
}

export default Error
