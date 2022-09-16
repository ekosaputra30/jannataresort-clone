<template>
  <main class="main">
    <Heroslider :data-sliders="dataSliders" />
    <TheResort :data-resort="dataResort" />
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
      dataSliders: [],
      dataResort: [],
    }
  },
  mounted() {
    this.getHeroSlider()
    this.getResort()
  },
  methods: {
    getHeroSlider: async function () {
      try {
        const { model } = await homepageServices.getHeroSlider()
        this.dataSliders = model.dataSlider
      } catch (error) {
        console.log(error)
      }
    },
    getResort: async function () {
      try {
        const { model } = await homepageServices.getResortSection()
        this.dataResort = model
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
