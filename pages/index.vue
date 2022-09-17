<template>
  <main class="main">
    <Heroslider :data-sliders="herosliders" />
    <TheResort :dataresort="resort" />
    <TheStay :datastay="datastay" />
    <TheDinner :datadinner="dinner" />
    <TheRelaxing :datarelaxing="relaxing" />
  </main>
</template>

<script>
import homepageServices from '~/core/services/homepage'
import Heroslider from '~/components/homepage/heroslider'
import TheResort from '~/components/homepage/the-resort'
import TheStay from '~/components/homepage/the-stay'
import TheDinner from '~/components/homepage/dinner'
import TheRelaxing from '~/components/homepage/relaxing'

export default {
  name: 'IndexPage',
  components: { Heroslider, TheResort, TheStay, TheDinner, TheRelaxing },
  data() {
    return {
      herosliders: [],
      resort: null,
      datastay: [],
      dinner: null,
      relaxing: null,
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
        this.relaxing = response[4].model
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
