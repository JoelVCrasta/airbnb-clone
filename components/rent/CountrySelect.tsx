"use client"

import { CountrySelectType } from "@/utils/types"
import useCountries from "@/app/hooks/useCountries"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CountrySelectProps {
  value?: CountrySelectType
  onChange: (value: CountrySelectType) => void
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll, getByValue } = useCountries()
  const countries = getAll()

  return (
    <Select
      value={value?.value}
      onValueChange={(val) => {
        const selected = getByValue(val)
        onChange(selected!)
      }}
    >
      <SelectTrigger className="w-full p-2 border rounded-md">
        <SelectValue placeholder="Country" />
      </SelectTrigger>

      <SelectContent className="max-h-64">
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            <div className="flex items-center gap-3">
              <span>{country.flag}</span>
              <span>
                {country.label},{" "}
                <span className="text-neutral-500">{country.region}</span>
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CountrySelect
