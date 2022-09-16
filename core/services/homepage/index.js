import homepageRepositories from '~/core/repositories/homepage'

const getHeroSlider = async () => {
  try {
    const response = await homepageRepositories.getHeroSlider()
    return response.data.components[0]
  } catch (error) {
    throw error
  }
}

const homepageServices = {
  getHeroSlider,
}

export default homepageServices
