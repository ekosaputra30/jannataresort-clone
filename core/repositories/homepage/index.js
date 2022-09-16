import { api } from '~/utils/helpers/http'

const getHeroSlider = () => api.get('/homepage.json')

const homepageRepositories = {
  getHeroSlider,
}

export default homepageRepositories
