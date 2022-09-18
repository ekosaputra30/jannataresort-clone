<template>
  <section class="section section__dinner" ref="dinnerel">
    <div v-if="datadinner" class="container section--inner">
      <div class="row dinner">
        <div class="w-12">
          <div class="dinner__image" ref="dinner__image">
            <img
              data-scroll
              data-scroll-speed="-0.5"
              :src="`${datadinner.featured.aws_file_url}/${datadinner.featured.path}/${datadinner.featured.filename.big}`"
              :alt="datadinner.description"
            />
          </div>
        </div>
        <div
          class="row flex-column dinner__content"
          data-scroll
          data-scroll-speed="-2.5"
          ref="dinner__content"
        >
          <div class="dinner__title section__headline">
            <h2>
              <span
                v-html="datadinner.title_one"
                class="js-content-trigger"
              ></span>
              <span
                v-html="datadinner.title_two"
                class="js-content-trigger"
              ></span>
            </h2>
          </div>
          <div class="dinner__description">
            <p v-html="datadinner.description"></p>
          </div>
          <div class="dinner__link">
            <a
              :href="datadinner.link.url"
              class="btn btn--green btn--hover-underline"
              v-html="datadinner.link.title"
            ></a>
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
  name: 'TheDinner',
  props: ['datadinner'],
  data() {
    return {
      mainTL: null,
      contentTriggers: [],
    }
  },
  mounted() {
    this.contentTriggers = this.$el.querySelectorAll('.js-content-trigger')
  },
  created() {
    if (this.datadinner) this.theMotion()
  },
  updated() {
    this.theMotion()
  },
  methods: {
    theMotion() {
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.dinnerel,
          scrub: 1,
          start: 'top bottom',
          end: '+=300%',
          toggleActions: 'play none reverse none',
        },
      })

      this.mainTL
        .fromTo(
          this.$refs.dinner__image,
          {
            clipPath: 'inset(0 100% 0 0)',
            immediateRender: false,
            autoAlpha: 0,
            x: '-50px',
          },
          { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, x: '0', duration: 2 }
        )
        .fromTo(
          this.contentTriggers,
          { y: '15px' },
          { y: '0', duration: 1, delay: 2, stagger: 0.5 }
        )
    },
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
.section__dinner {
  background-color: var(--stay-color);
}
.dinner {
  position: relative;
  &__image {
    width: 95%;
    img {
      height: auto;
      max-width: 100%;
    }
  }
  &__content {
    background-color: white;
    margin: 0 auto;
    padding: 30px;
    width: calc(100% - 40px);
    @include media-breakpoint(md) {
      padding: 50px 60px 70px;
      position: absolute;
      right: 0;
      width: 54%;
    }
  }
  &__title,
  &__description {
    color: var(--resort-color);
  }
  &__title {
    letter-spacing: 3px;
    position: relative;
    margin-bottom: 45px;
    &:after {
      content: '';

      background-color: #679334;
      bottom: -25px;
      height: 1px;
      left: 5rem;
      position: absolute;
      width: 100%;
    }
    span {
      display: block;
      font-size: 28px;
      line-height: 1.5;
      overflow: hidden;
      &:last-child {
        color: #679334;
      }
      @include media-breakpoint(md) {
        font-size: 35px;
      }
    }
    @include media-breakpoint(md) {
      margin-bottom: 80px;
      &:after {
        bottom: -35px;
        left: 10rem;
      }
    }
  }
}
</style>
