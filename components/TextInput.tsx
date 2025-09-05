import { Input } from "@/components/ui/input"
import { IconType } from "react-icons"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  icon?: IconType
}

const TextInput = ({
  value,
  onChange,
  placeholder,
  required,
  icon: Icon,
}: TextInputProps) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
          <Icon size={20} />
        </div>
      )}

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        type="text"
        className={Icon ? "pl-10" : ""}
      />
    </div>
  )
}

export default TextInput
