import { api } from '~/utils/helpers/http'

const getHomepage = () => api.get('/homepage.json')

const homepageRepositories = {
  getHomepage,
}

export default homepageRepositories
