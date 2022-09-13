import axios from 'axios'

const http = axios.create()
const api = axios.create({
  baseUrl: process.env.baseUrl,
})

export { api }
export default http
