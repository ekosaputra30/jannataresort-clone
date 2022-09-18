<template>
  <section v-if="datastay" class="section section__thestay" ref="thestayel">
    <div class="container section--inner">
      <div class="row thestay">
        <div class="w-12 w-offset-md-6">
          <div class="row flex-column thestay__content align-center h-100">
            <div class="thestay__title section__headline | js-content-trigger">
              <h2 v-html="datastay.title"></h2>
            </div>
            <div class="thestay__description | js-content-trigger">
              <p v-html="datastay.description"></p>
            </div>
          </div>
        </div>
        <div class="w-12">
          <div class="slider d-flex flex-column flex-md-row">
            <div
              v-for="(slider, index) in datastay.dataSlider"
              :key="index"
              class="w-md-4 slider__column"
            >
              <a
                :href="slider.link.url"
                class="slider__item d-flex"
                @mouseover="hoverBgItem($event, true)"
                @mouseleave="hoverOutBgItem($event, false)"
                :class="{ hovered: hoverBG }"
              >
                <h3 class="slider__title">{{ slider.link.title }}</h3>
                <div
                  class="slider__bg"
                  v-bind:style="{
                    'background-image': `url(${slider.featured.aws_file_url}/${slider.featured.path}/${slider.featured.filename.big})`,
                  }"
                  v-bind:data-hover="`${slider.featured_hover.aws_file_url}/${slider.featured_hover.path}/${slider.featured_hover.filename.big}`"
                >
                  <div></div>
                </div>
              </a>
            </div>
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
  name: 'TheStay',
  props: ['datastay'],
  data() {
    return {
      hoverBG: false,
      mainTL: null,
      contentTriggers: [],
    }
  },
  mounted() {
    this.contentTriggers = this.$el.querySelectorAll('.js-content-trigger')
  },
  created() {
    if (this.datastay) this.theMotion()
  },
  updated() {
    this.theMotion()
  },
  methods: {
    theMotion() {
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.thestayel,
          scrub: 1,
          start: 'top bottom-=10%',
          end: '+=100%',
          toggleActions: 'play none reverse none',
        },
      })

      this.mainTL.fromTo(
        this.contentTriggers,
        { y: '50px', autoAlpha: 0, immediateRender: false },
        { y: '0', autoAlpha: 1, duration: 1, delay: 2, stagger: 1 }
      )
    },
    hoverBgItem(e) {
      let thisItem = e.target
      let thisBg = thisItem
        .querySelector('.slider__bg')
        .getAttribute('data-hover')

      this.hoverBG = true
      this.switchBg(thisBg)
    },
    hoverOutBgItem(e) {
      this.hoverBG = false
    },
    switchBg(src) {
      let sliderBG = this.$el.querySelectorAll('.slider__bg>div')
      sliderBG.forEach((div) => {
        div.style.backgroundImage = `url(${src})`
      })
    },
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
.section__thestay {
  background-color: #5f5c68;
}
.thestay {
  &__title,
  &__description {
    color: var(--stay-color);
  }
}
.slider {
  &__column {
    &:nth-child(1) {
      .slider__bg > div {
        background-position: 0;
      }
    }
    &:nth-child(2) {
      .slider__bg > div {
        background-position: 50%;
      }
    }
    &:nth-child(3) {
      .slider__bg > div {
        background-position: 100%;
      }
    }
  }

  &__item {
    align-items: flex-end;
    color: white;
    height: 150px;
    justify-content: center;
    margin-bottom: 40px;
    padding-bottom: 50px;
    position: relative;
    text-decoration: none;
    width: 100%;
    > * {
      width: 100%;
    }
    &.hovered {
      .slider__bg {
        > div {
          left: 0;
          opacity: 1;
          transition: all 0.3s;
        }
      }
      .slider__title {
        opacity: 0.3;
        transition: all 0.3s;
        &:after {
          background-color: rgba(white, 0.3);
          transition: all 0.3s;
        }
      }
    }
    &:hover {
      .slider__title {
        left: 13%;
        transition: all 0.3s;
        &:after {
          background-color: rgba(white, 0.6) !important;
          width: 55% !important;
          transition: all 0.3s;
        }
        @include media-breakpoint(md) {
          left: 17%;
        }
      }
    }
    @include media-breakpoint(md) {
      height: 450px;
      margin: 0 auto 0;
      padding-bottom: 70px;
      width: 98%;
    }
  }

  &__title {
    font-size: 11px;
    left: 15%;
    opacity: 1;
    position: relative;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all 0.3s;
    z-index: 3;
    &:after {
      content: '';

      background-color: rgba(white, 1);
      height: 1px;
      left: 0;
      position: absolute;
      top: -10px;
      width: 30%;
      transition: all 0.3s;
    }
    @include media-breakpoint(md) {
      left: 20%;
    }
  }

  &__bg {
    background: {
      position: 50%;
      repeat: no-repeat;
      size: 100%;
    }
    height: 100%;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    > div {
      background: {
        position: 50%;
        repeat: no-repeat;
        size: 300% 100%;
      }
      left: -102%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      transition: all 0.3s;
      z-index: 2;
    }
    @include media-breakpoint(md) {
      background-size: auto 100%;
    }
  }

  &__title,
  &__bg {
    pointer-events: none;
  }
}
</style>
