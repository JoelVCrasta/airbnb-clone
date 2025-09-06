"use client"

import { useState, useRef } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CountrySelectType } from "@/utils/types"
import useCountries from "@/app/hooks/useCountries"

interface CountrySelectProps {
  value?: CountrySelectType
  onChange: (value: CountrySelectType) => void
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll, getByLabel } = useCountries()
  const countries = getAll()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between py-6 border-2"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{value.flag}</span>
              <span>
                {value.label},{" "}
                <span className="text-neutral-500">{value.region}</span>
              </span>
            </span>
          ) : (
            "Select a country"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-full p-0"
        style={{
          width: triggerRef.current?.offsetWidth ?? "auto",
        }}
      >
        <Command>
          <CommandInput placeholder="Search country..." />

          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={(val) => {
                    const selected = getByLabel(val)
                    onChange(selected!)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.value === country.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>
                      {country.label},{" "}
                      <span className="text-neutral-500">{country.region}</span>
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CountrySelect
