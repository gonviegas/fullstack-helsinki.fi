import axios from 'axios'
import { rootUrl } from './axios'

const baseUrl = rootUrl + '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
