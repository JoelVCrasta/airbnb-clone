"use client"

import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ListingReservationProps {
  price: number
  totalPrice: number
  onChangeDate: (value: DateRange) => void
  dateRange: DateRange
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  onSubmit,
  dateRange,
  disabledDates,
  disabled,
}: ListingReservationProps) => {
  return (
    <Card className="rounded-xl border p-0 shadow-none">
      <CardContent className="px-0  flex flex-col gap-4">
        <div className="flex flex-row items-center gap-1 border-b p-4">
          <span className="text-2xl font-semibold">$ {price}</span>
          <span className="font-light text-neutral-600">night</span>
        </div>

        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onChangeDate}
          numberOfMonths={1}
          disabled={[{ before: new Date() }, ...disabledDates]}
          required
          className="px-16 w-full"
        />

        <div className="space-y-4 p-4 border-t text-md">
          {/*           <div className="flex flex-col items-center justify-between font-medium">
            <div className="flex flex-row items-center justify-between w-full">
              <span>Check In</span>
              <span className="text-neutral-500">
                {dateRange?.from?.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <span>Check Out</span>
              <span className="text-neutral-500">
                {dateRange?.to?.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div> */}

          <Button
            onClick={onSubmit}
            disabled={disabled}
            className="w-full py-6"
          >
            Reserve
          </Button>

          <div className="flex flex-row items-center justify-between font-medium">
            <span>Total</span>
            <span className="text-neutral-500">$ {totalPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ListingReservation
