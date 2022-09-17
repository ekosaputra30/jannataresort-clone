<template>
  <main class="main">
    <Heroslider :data-sliders="herosliders" />
    <TheResort :dataresort="resort" />
  </main>
</template>

<script>
import homepageServices from '~/core/services/homepage'
import Heroslider from '~/components/homepage/heroslider'
import TheResort from '~/components/homepage/the-resort'

export default {
  name: 'IndexPage',
  components: { Heroslider, TheResort },
  data() {
    return {
      herosliders: [],
      resort: null,
    }
  },
  methods: {
    async getHomepage() {
      try {
        let response = await homepageServices.getHomepage()

        this.herosliders = response[0].model.dataSlider
        this.resort = response[1].model
        console.log(this.resort)
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getHomepage()
  },
}
</script>
