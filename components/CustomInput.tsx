import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons"

interface CustomInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  icon?: IconType
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const CustomInput = ({
  id,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  icon: Icon,
  register,
  errors,
}: CustomInputProps) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute top-1/2 left-3 translate-y-1/8 text-gray-500">
          <Icon size={20} />
        </div>
      )}

      <label className="block text-sm font-medium mb-2">{label}</label>

      <Input
        id={id}
        {...register(id, { required })}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        className={cn(
          "py-6 border-2",
          Icon ? "pl-10" : "",
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        )}
      />
    </div>
  )
}

export default CustomInput
