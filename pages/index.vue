<template>
  <Heroslider :data-sliders="dataSliders" />
</template>

<script>
import Heroslider from '~/components/homepage/heroslider'
import homepageServices from '~/core/services/homepage'

export default {
  name: 'IndexPage',
  components: { Heroslider },
  data() {
    return {
      dataSliders: [],
    }
  },
  mounted() {
    this.getHeroSlider()
  },
  computed: {
    getSlider() {
      return this.dataSliders
    },
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
  },
}
</script>
