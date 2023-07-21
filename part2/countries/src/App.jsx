import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'
import { CountryDetails } from './components/CountryDetails'
import countriesService from './services/countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log(initialCountries)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const countriesFiltered = !filter
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  const handleFilterChange = newFilter => {
    setFilter(newFilter)
    setSelectedCountry(null)
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {countriesFiltered.length <= 10 &&
        countriesFiltered.length !== 1 &&
        countriesFiltered.map((country, idx) => (
          <Countries
            key={idx}
            country={country}
            setSelectedCountry={setSelectedCountry}
          />
        ))}
      {countriesFiltered.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countriesFiltered.length === 1 ? (
        <CountryDetails country={countriesFiltered[0]} />
      ) : (
        selectedCountry && <CountryDetails country={selectedCountry} />
      )}
    </>
  )
}

export default App
