import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getCity = (city, _countryCode) => {
  const req = axios.get(`${baseUrl}${city},${_countryCode}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
  return req.then(res => res.data)
}

export default { getCity }
