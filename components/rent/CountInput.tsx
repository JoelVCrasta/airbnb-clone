"use client"

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { Button } from "@/components/ui/button"

interface ICountInputProps {
  title: string
  subTitle: string
  value: number
  onChange: (value: number) => void
}

const CountInput = ({
  title,
  subTitle,
  value,
  onChange,
}: ICountInputProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])

  const onReduce = useCallback(() => {
    if (value === 1) return
    onChange(value - 1)
  }, [value, onChange])

  return (
    <div className="flex items-center justify-between py-2">
      {/* Title & Subtitle */}
      <div className="flex flex-col">
        <span className="font-medium text-base">{title}</span>
        <span className="text-sm text-muted-foreground">{subTitle}</span>
      </div>

      {/* Counter controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          disabled={value === 1}
          onClick={onReduce}
          className="rounded-full"
        >
          <AiOutlineMinus className="h-4 w-4" />
        </Button>

        <span className="text-lg font-medium select-none min-w-[24px] text-center">
          {value}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={onAdd}
          className="rounded-full"
        >
          <AiOutlinePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default CountInput
