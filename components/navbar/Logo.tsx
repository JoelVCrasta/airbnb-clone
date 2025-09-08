import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <div className="flex-shrink-0 w-1/3">
      <Link href="/" title="stayeo" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={0}
          className="mr-2 aspect-square object-contain"
        />
        <p className="text-xl lg:text-3xl  font-normal">fakebnb</p>
      </Link>
    </div>
  )
}

export default Logo
