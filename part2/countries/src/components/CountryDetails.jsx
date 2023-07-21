import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

export const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState('')
  useEffect(() => {
    weatherService
      .getCity(country.capital, country.cca2)
      .then(res => {
        setWeather(res)
      })
      .catch(err => console.log(err))
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((language, idx) => (
          <li key={idx}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} style={{maxWidth: 200}}/>
      <h2>Weather in {country.capital}</h2>
      {weather && (
        <div>
          <div>Temperature: {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}
