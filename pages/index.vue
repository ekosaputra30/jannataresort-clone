<template>
  <main class="main">
    <Heroslider :data-sliders="herosliders" />
    <TheResort :dataresort="resort" />
    <TheStay :datastay="datastay" />
    <TheDinner :datadinner="dinner" />
  </main>
</template>

<script>
import homepageServices from '~/core/services/homepage'
import Heroslider from '~/components/homepage/heroslider'
import TheResort from '~/components/homepage/the-resort'
import TheStay from '~/components/homepage/the-stay'
import TheDinner from '~/components/homepage/dinner'

export default {
  name: 'IndexPage',
  components: { Heroslider, TheResort, TheStay, TheDinner },
  data() {
    return {
      herosliders: [],
      resort: null,
      datastay: [],
      dinner: null,
    }
  },
  methods: {
    async getHomepage() {
      try {
        let response = await homepageServices.getHomepage()

        this.herosliders = response[0].model.dataSlider
        this.resort = response[1].model
        this.datastay = response[2].model
        this.dinner = response[3].model
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
