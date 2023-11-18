import { useState, useEffect } from 'react'
import countriesService from '../services/countries'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name)
      countriesService
        .get(name)
        .then(res => {
          const resCountry = {
            found: true,
            data: {
              name: res.data.name.common,
              capital: res.data.capital[0],
              population: res.data.population,
              flag: res.data.flags.png
            }
          }
          setCountry(resCountry)
        })
        .catch(err => {
          setCountry({ found: false })
          console.log(err)
        })
    else setCountry(null)
  }, [name])

  return country
}
