<template>
  <section
    v-if="datarelaxing"
    class="section section--bgimage section__relaxing"
    ref="relaxingel"
  >
    <div
      ref="bg"
      class="bg"
      v-bind:style="{
        'background-image': `url(${datarelaxing.featured.aws_file_url}/${datarelaxing.featured.path}/${datarelaxing.featured.filename.big})`,
      }"
    ></div>
    <div class="container section--inner">
      <div class="row relaxing">
        <div class="row flex-column relaxing__content">
          <div class="relaxing__title section__headline | js-content-trigger">
            <h2>
              <span v-html="datarelaxing.title"></span>
            </h2>
          </div>
          <div class="relaxing__description | js-content-trigger">
            <p v-html="datarelaxing.description"></p>
          </div>
          <div class="relaxing__link | js-content-trigger">
            <a
              :href="datarelaxing.link.url"
              class="btn btn--white btn--hover-underline"
              v-html="datarelaxing.link.title"
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
  name: 'TheRelaxing',
  props: ['datarelaxing'],
  data() {
    return {
      mainTL: null,
      contentTriggers: [],
    }
  },
  mounted() {
    // this.contentTriggers = this.$el.querySelectorAll('.js-content-trigger')
  },
  created() {
    if (this.datarelaxing) this.theMotion()
  },
  updated() {
    this.theMotion()
  },
  methods: {
    getRatio(el) {
      window.innerHeight / (window.innerHeight + el.offsetHeight)
    },
    theMotion() {
      let bg = this.$refs.bg
      this.contentTriggers = this.$el.querySelectorAll('.js-content-trigger')
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.relaxingel,
          scrub: false,
          start: 'center bottom',
          // end: '+=200%',
          // toggleActions: 'play none reverse none',
          onUpdate: function (self) {
            gsap.set(bg, { top: self.scroll() - bg.parentElement.offsetTop })
          },
        },
      })

      this.mainTL
        .fromTo(
          bg,
          {
            backgroundPosition: `50% 0px`,
          },
          {
            backgroundPosition: `50% ${-innerHeight / 2}`,
            ease: 'none',
          }
        )
        .fromTo(
          this.contentTriggers,
          { y: '50px', autoAlpha: 0 },
          { y: '0', autoAlpha: 1, duration: 1, stagger: 0.2 }
        )
    },
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
.section__relaxing {
  .bg {
    background: {
      repeat: no-repeat;
      position: 50% 0;
      size: cover;
    }
    left: 0;
    object-fit: cover;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: 100%;
    height: 130%;
  }
}
.relaxing {
  padding-top: 50px;
  position: relative;
  &__content {
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
    color: white;
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
      &:last-child {
        color: white;
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
