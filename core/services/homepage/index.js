import homepageRepositories from '~/core/repositories/homepage'

const getHeroSlider = async () => {
  try {
    const response = await homepageRepositories.getHomepage()
    return response.data.components[0]
  } catch (error) {
    throw error
  }
}

const getResortSection = async () => {
  try {
    const response = await homepageRepositories.getHomepage()
    return response.data.components[1]
  } catch (error) {
    throw error
  }
}

const homepageServices = {
  getHeroSlider,
  getResortSection,
}

export default homepageServices
