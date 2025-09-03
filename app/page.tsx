import Categories from "@/components/navbar/Categories"
import ClientOnly from "@/components/ClientOnly"

const Home = async () => {
  return (
    <>
      <ClientOnly>
        <Categories />
      </ClientOnly>
    </>
  )
}

export default Home
