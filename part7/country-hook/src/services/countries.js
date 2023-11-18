import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const get = async country => {
  const res = await axios.get(`${baseUrl}/name/${country}`)
  return res
}

export default { get }
