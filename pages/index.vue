<template>
  <main class="main" data-scroll-container>
    <Heroslider
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :data-sliders="herosliders"
    />
    <TheResort
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :dataresort="resort"
    />
    <TheStay
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :datastay="datastay"
    />
    <TheDinner
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :datadinner="dinner"
    />
    <TheRelaxing
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :datarelaxing="relaxing"
    />
    <Testimonial
      data-scroll-section
      data-scroll
      data-scroll-repeat
      :datatestimonial="testimonials"
    />
    <Footer data-scroll-section data-scroll data-scroll-repeat />
  </main>
</template>

<script>
import homepageServices from '~/core/services/homepage'
import Heroslider from '~/components/homepage/heroslider'
import TheResort from '~/components/homepage/the-resort'
import TheStay from '~/components/homepage/the-stay'
import TheDinner from '~/components/homepage/dinner'
import TheRelaxing from '~/components/homepage/relaxing'
import Testimonial from '~/components/homepage/testimonial'
import Footer from '~/components/footer'

export default {
  name: 'IndexPage',
  components: {
    Heroslider,
    TheResort,
    TheStay,
    TheDinner,
    TheRelaxing,
    Testimonial,
    Footer,
  },
  data() {
    return {
      herosliders: [],
      resort: null,
      datastay: [],
      dinner: null,
      relaxing: null,
      testimonials: [],
      scroller: null,
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
        this.testimonials = response[5].model.dataSlider
      } catch (error) {
        console.log(error)
      }
    },
    initScroller() {
      this.scroller = new this.locomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      })
    },
  },
  created() {
    this.getHomepage()
  },
  mounted() {
    this.initScroller()
  },
  updated() {
    this.scroller.update()
  },
}
</script>
