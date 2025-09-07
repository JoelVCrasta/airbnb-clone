import Heading from "./Heading"

interface PageHeadingProps {
  title: string
  subtitle: string
}

const PageHeading = ({ title, subtitle }: PageHeadingProps) => {
  return (
    <div className="my-4">
      <Heading title={title} subtitle={subtitle} />
    </div>
  )
}

export default PageHeading
