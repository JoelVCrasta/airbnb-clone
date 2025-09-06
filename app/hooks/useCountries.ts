import countries from "world-countries"

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

const useCountries = () => {
  const getAll = () => formattedCountries

  const getByLabel = (value: string) =>
    formattedCountries.find((c) => c.label === value)

  return {
    getAll,
    getByLabel,
  }
}

export default useCountries
