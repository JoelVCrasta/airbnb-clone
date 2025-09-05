import { AiOutlineLoading } from "react-icons/ai"

interface LoaderProps {
  size?: number
  screen?: boolean
}

const Loader = ({ size, screen }: LoaderProps) => {
  return (
    <div
      className={`
        ${screen ? "h-screen" : "h-full"}
        w-full flex justify-center items-center`}
    >
      <AiOutlineLoading
        size={size ?? "40"}
        className="animate-spin text-rose-500"
      />
    </div>
  )
}

export default Loader
