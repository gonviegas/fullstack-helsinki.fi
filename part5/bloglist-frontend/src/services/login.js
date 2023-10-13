import axios from 'axios'
import { rootUrl } from './axios'

const baseUrl = rootUrl + '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
