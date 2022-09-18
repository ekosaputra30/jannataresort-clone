<template>
  <section v-if="datatestimonial" class="section section__testi">
    <div class="container section--inner">
      <div class="row testi">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(testi, index) in datatestimonial"
              class="swiper-slide"
              :class="`slide--${index}`"
            >
              <div class="slider-content">
                <p v-html="testi.description"></p>
                <span v-html="testi.title"></span>
              </div>
            </div>
          </div>
          <!-- If pagination is needed -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'

export default {
  name: 'Testimonial',
  props: ['datatestimonial'],
  data() {
    return {}
  },
  mounted() {
    this.initSlider()
  },
  methods: {
    initSlider() {
      Swiper.use([Navigation, Pagination, Autoplay])

      const swiper = new Swiper('.swiper', {
        directional: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination, Autoplay],
        // Pagination if needed
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        // Autoplay if needed
        autoplay: {
          delay: 7000,
        },
      })
    },
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
@import '~/node_modules/swiper/swiper-bundle.min.css';
.section__testi {
  background-color: var(--stay-color);
}
.testi {
  @include media-breakpoint(lg) {
    justify-content: center;
  }
}
.swiper {
  overflow: hidden;
  position: relative;
  width: 600px;
  &-slide {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  &-pagination-bullet {
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.25);
    &-active {
      background-color: var(--swiper-pagination-color, #333);
      opacity: var(--swiper-pagination-bullet-opacity, 1);
    }
  }
}
.slider-content {
  color: #5f5c68;
  padding-bottom: 80px;
  p {
    font-family: 'Playfair Display';
    line-height: 24px;
    margin-bottom: 30px;
    @include media-breakpoint(lg) {
      font-size: 20px;
      line-height: 36px;
      text-align: center;
    }
  }
  span {
    display: block;
    text-align: center;
    @include media-breakpoint(lg) {
      font-size: 15px;
    }
  }
}
</style>
