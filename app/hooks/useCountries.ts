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

  const getByValue = (value: string) =>
    formattedCountries.find((c) => c.value === value)

  const getCoordsByValue = (value: string) => {
    const loc = formattedCountries.find((c) => c.value === value)?.latlng
    return loc && ([loc[1], loc[0]] as [number, number])
  }

  return {
    getAll,
    getByLabel,
    getByValue,
    getCoordsByValue,
  }
}

export default useCountries
