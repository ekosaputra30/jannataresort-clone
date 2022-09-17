import homepageRepositories from '~/core/repositories/homepage'

const getHomepage = async () => {
  try {
    const { data } = await homepageRepositories.getHomepage()
    return data.components
  } catch (error) {
    throw error
  }
}

const homepageServices = {
  getHomepage,
}

export default homepageServices
