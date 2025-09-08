import { PulseLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="h-[550px] w-full flex justify-center items-center">
      <PulseLoader size={16} />
    </div>
  )
}

export default Loading
