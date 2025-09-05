interface HeadingProps {
  title: string
  subtitle: string
  center?: boolean
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={`${center ? "text-center" : ""}`}>
      <p className="text-xl sm:text-2xl font-semibold">{title}</p>
      <p className="text-sm sm:text-base text-neutral-700">{subtitle}</p>
    </div>
  )
}

export default Heading
