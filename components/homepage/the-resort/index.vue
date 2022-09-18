<template>
  <section class="section section__theresort">
    <div v-if="dataresort" class="container section--inner">
      <div class="row row-md-reverse theresort">
        <div
          class="rectangle"
          ref="rectangle"
          data-scroll
          data-scroll-speed="-1"
        ></div>
        <div class="w-12 w-md-6">
          <div
            class="row flex-column theresort__content h-100"
            ref="theresort__content"
          >
            <div
              class="theresort__title section__headline | js-content-trigger"
            >
              <h2 v-html="dataresort.title"></h2>
            </div>
            <div class="theresort__description | js-content-trigger">
              <p v-html="dataresort.description"></p>
            </div>
            <div class="theresort__link | js-content-trigger">
              <a
                :href="dataresort.link.url"
                class="btn btn--green btn--hover-underline"
                v-html="dataresort.link.title"
              ></a>
            </div>
          </div>
        </div>
        <div class="w-12 w-md-6">
          <div class="theresort__image" ref="theresort__image">
            <img
              data-scroll
              data-scroll-speed="-0.95"
              :src="`${dataresort.featured.aws_file_url}/${dataresort.featured.path}/${dataresort.featured.filename.big}`"
              :alt="dataresort.description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'TheResort',
  props: ['dataresort'],
  data() {
    return {
      mainTL: null,
    }
  },
  created() {
    if (this.dataresort) this.theMotion()
  },
  updated() {
    this.theMotion()
  },
  methods: {
    theMotion() {
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.rectangle,
          scrub: 1,
          start: 'top bottom',
          end: '+=100%',
          toggleActions: 'play none reverse none',
        },
      })

      this.mainTL
        .fromTo(
          this.$refs.theresort__image,
          {
            clipPath: 'inset(0 100% 0 0)',
            immediateRender: false,
            autoAlpha: 0,
            x: '-40px',
          },
          { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, x: '0', duration: 1 }
        )
        .fromTo(
          this.$el.querySelectorAll('.js-content-trigger'),
          { y: '50px', autoAlpha: 0 },
          { y: '0', autoAlpha: 1, duration: 1, delay: 2, stagger: 1 }
        )
    },
  },
}
</script>

<style lang="scss">
@import '~assets/styles/mixins.scss';
.section__theresort {
  background-color: #f0f0f5;
}
.theresort {
  padding: {
    bottom: 25px;
    top: 25px;
  }
  position: relative;
  z-index: 1;
  @include media-breakpoint(md) {
    padding: {
      bottom: 80px;
      top: 50px;
    }
    .rectangle {
      background-color: #d8d6e2;
      height: calc(100% - 130px);
      position: absolute;
      top: 60px;
      right: -5%;
      width: 80%;
      z-index: -1;
    }
  }
  @include media-breakpoint(md) {
    .rectangle {
      right: -10%;
    }
  }
  &__content {
    padding: {
      bottom: 30px;
      top: 50px;
    }
    @include media-breakpoint(md) {
      justify-content: center;
      padding: {
        bottom: 0px;
        left: 100px;
        right: 50px;
        top: 0;
      }
    }
  }
  &__title,
  &__description {
    color: var(--resort-color);
  }
  &__title {
    @include media-breakpoint(md) {
      margin-top: 100px;
    }
  }
  &__image {
    overflow: hidden;
    img {
      height: auto;
      max-width: 115%;
    }
  }
}
</style>
