import { Input } from "@/components/ui/input"
import { IconType } from "react-icons"
import { useState } from "react"

interface NumberInputProps {
  value: number | ""
  onChange: (value: number | "") => void
  placeholder?: string
  required?: boolean
  icon?: IconType
  min?: number
  max?: number
}

const NumberInput = ({
  value,
  onChange,
  placeholder,
  required,
  icon: Icon,
  min,
  max,
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<string>(value.toString())

  const handleChange = (rawValue: string) => {
    if (rawValue === "") {
      setInternalValue("")
      onChange("")
      return
    }

    if (!/^\d*$/.test(rawValue)) return

    setInternalValue(rawValue)

    let number = Number(rawValue)
    if (min !== undefined && number < min) number = min
    if (max !== undefined && number > max) number = max

    onChange(number)
  }

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
          <Icon size={20} />
        </div>
      )}

      <Input
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        type="text" // We handle number parsing ourselves
        inputMode="numeric"
        className={Icon ? "pl-10" : ""}
      />
    </div>
  )
}

export default NumberInput
