<template>
  <!-- banner section -->
  <section v-if="dataSliders" id="banner_section" class="banner_section">
    <div
      ref="q_slide"
      autoplay
      animate
      mousefollow
      parallax
      opacity=".3"
      class="q_slide_section"
    >
      <div class="q_slide-inner">
        <div class="slides">
          <div
            v-for="(slider, index) in dataSliders"
            :key="index"
            :class="`slide is-loaded ${index === 0 ? 'q_current' : ''}`"
          >
            <div class="slide-content">
              <div class="caption">
                <h2 class="q_splitText" v-html="slider.title"></h2>
                <p class="" v-html="slider.description"></p>
                <div class="link">
                  <a
                    :href="slider.link.url"
                    class="btn btn__outline--white btn--white"
                    v-html="slider.link.title"
                  ></a>
                </div>
              </div>
            </div>
            <div class="image-container">
              <div class="image-wrapper">
                <img
                  :src="`${slider.featured.aws_file_url}/${slider.featured.path}/${slider.featured.filename.raw}`"
                  :alt="slider.description"
                  class="image"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <div
            v-for="(slider, index) in dataSliders"
            :key="index"
            :class="`item ${index === 0 ? 'q_current' : ''}`"
            @click="clickPaging($event)"
          >
            <span class="icon">{{ index + 1 }}</span>
          </div>
        </div>

        <!-- navigation -->
        <div class="navigation">
          <div class="navigation__prev" @click="clickNav($event, true)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div class="navigation__next" @click="clickNav($event, false)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll_link_outer"></div>
  </section>
</template>

<script>
import { gsap, Expo, Power3, Power4 } from 'gsap'

export default {
  name: 'HeroSlider',
  props: ['dataSliders'],
  data() {
    return {
      q_slideFriction: 0,
      slideOpacity: 0,
    }
  },
  created() {},
  mounted() {
    this.run()
  },
  methods: {
    indexInParent: function (node) {
      var children = node.parentNode.childNodes
      var num = 0
      for (var i = 0; i < children.length; i++) {
        if (children[i] == node) return num
        if (children[i].nodeType == 1) num++
      }
      return -1
    },
    triggerResize: function () {
      let ev = document.createEvent('HTMLEvents')
      ev.initEvent('resize', true, false)
      window.dispatchEvent(ev)
    },
    run: function () {
      let slide = this.$refs.q_slide

      if (slide) this.setup(slide)
    },
    pageUpdate: function () {
      let slide = this.$refs.q_slide
      const pagination = slide.querySelector('.pagination')

      if (pagination) {
        var pages = pagination.querySelectorAll('.item')
        var activePage = pagination.querySelector('.q_current')
        var newSlide = slide.querySelector('.is-new')
        var index = this.indexInParent(newSlide)

        activePage.classList.remove('q_current')
        pages[index].classList.add('q_current')
      }
    },
    setup: function (slide) {
      slide.classList.add('q_slide')
      const slides = slide.querySelectorAll('.slide')
      const pagination = slide.querySelector('.pagination')

      if (slide.getAttribute('parallax') != null) {
        this.q_slideFriction = slide.getAttribute('parallax') || 0.25
      }

      if (slide.getAttribute('opacity') != null) {
        this.slideOpacity = slide.getAttribute('opacity') || 0.6
      }

      // if (pagination) {
      //   var pages = pagination.querySelectorAll('.item')
      //   for (var i = pages.length - 1; i >= 0; i--) {
      //     var page = pages[i]
      //     page.addEventListener('click', function (e) {
      //       this.q_slideSwitch(slide, this.indexInParent(e.target))
      //       this.triggerResize()
      //     })
      //   }
      // }
    },
    autoPlay: function () {
      if (slide.getAttribute('autoplay') != null) {
        let q_slideDuration = slide.getAttribute('autoplay') || 6000
        let timeout = setTimeout(function () {
          this.q_slideNext(slide, false, true)
        }, q_slideDuration)
      }
    },
    q_slideNext: function (q_slide, previous, auto) {
      const slides = q_slide.querySelectorAll('.slide')
      var activeSlide = q_slide.querySelector('.q_current')
      var newSlide = null
      if (previous) {
        newSlide = activeSlide.previousElementSibling
        if (!newSlide) {
          newSlide = slides[slides.length - 1]
        }
      } else {
        newSlide = activeSlide.nextElementSibling
        if (!newSlide) newSlide = slides[0]
      }
      this.q_slideSwitch(q_slide, this.indexInParent(newSlide), auto)

      this.triggerResize()
    },
    q_slideSwitch: function (q_slide, index, auto) {
      function eq(index) {
        if (index >= 0 && index < this.length) return this[index]
        else return -1
      }

      const slides = q_slide.querySelectorAll('.slide')
      if (q_slide.getAttribute('wait') === 'true') return

      let activeSlide = q_slide.querySelector('.q_current')
      let activeSlideImage = activeSlide.querySelector('.image-container')
      let newSlide = eq.call(slides, index)
      let newSlideImage = newSlide.querySelector('.image-container')
      let newSlideContent = newSlide.querySelector('.slide-content')
      // let newSlideElements = newSlide.querySelectorAll('.caption > h1')
      let newSlideElementsTwo = newSlide.querySelectorAll('.caption > h2')
      let newSlideElementsThree = newSlide.querySelectorAll('.caption > p')
      let newSlideElementsLink = newSlide.querySelectorAll('.caption > .link')

      if (newSlide === activeSlide) return

      newSlide.classList.add('is-new')

      let timeout = 0
      clearTimeout(timeout)
      this.pageUpdate()

      q_slide.setAttribute('wait', 'true')
      let newSlideRight = ''
      let newSlideLeft = 0
      let newSlideImageLeft = -q_slide.clientWidth * this.q_slideFriction + 'px'
      let newSlideContentLeft = 0
      let newSlideContentRight = 'auto'
      let activeSlideImageLeft =
        q_slide.clientWidth * this.q_slideFriction + 'px'
      let sideAnim = 'sideRight'
      let splitAnim = 'splitRight'

      if (this.indexInParent(newSlide) > this.indexInParent(activeSlide)) {
        // next slide
        newSlideRight = 0
        newSlideLeft = 'auto'
        newSlideImageLeft =
          -q_slide.clientWidth * (1 - this.q_slideFriction) + 'px'
        newSlideContentLeft = 'auto'
        newSlideContentRight = 0
        activeSlideImageLeft =
          -q_slide.clientWidth * this.q_slideFriction + 'px'
        sideAnim = 'sideLeft'
        splitAnim = 'splitLeft'
      } else {
        // prev slide
        newSlideRight = ''
        newSlideLeft = 0
        newSlideImageLeft = -q_slide.clientWidth * this.q_slideFriction + 'px'
        newSlideContentLeft = 0
        newSlideContentRight = 'auto'
        activeSlideImageLeft = q_slide.clientWidth * this.q_slideFriction + 'px'
        sideAnim = 'sideRight'
        splitAnim = 'splitRight'
      }

      newSlide.style.display = 'block'
      newSlide.style.width = 0
      newSlide.style.right = newSlideRight
      newSlide.style.left = newSlideLeft
      newSlide.style.zIndex = 2

      newSlideImage.style.width = q_slide.clientWidth + 'px'
      activeSlideImage.style.transform = 'translateX(0)'

      gsap.set(newSlideImage, { x: newSlideImageLeft })

      if (this.slideOpacity) {
        newSlideImage.style.opacity = this.slideOpacity
      }

      newSlideContent.style.width = q_slide.clientWidth + 'px'
      newSlideContent.style.right = newSlideContentRight
      newSlideContent.style.left = newSlideContentLeft

      if (this.slideOpacity) {
        gsap.to(activeSlideImage, {
          x: activeSlideImageLeft,
          opacity: this.slideOpacity,
          ease: Expo.easeInOut,
          duration: 1.5,
        })
      } else {
        gsap.to(activeSlideImage, {
          x: activeSlideImageLeft,
          ease: Expo.easeInOut,
          duration: 1.5,
        })
      }

      gsap.to(newSlide, {
        width: q_slide.clientWidth,
        ease: Expo.easeInOut,
        duration: 1.5,
      })

      gsap.to(newSlideImage, {
        x: 0,
        opacity: 1,
        ease: Expo.easeInOut,
        duration: 1.5,
        onComplete: function () {
          // switch active class
          newSlide.classList.add('q_current')
          newSlide.classList.remove('is-new')
          activeSlide.classList.remove('q_current')
          // newSlideElements[0].removeAttribute('style')
          newSlideElementsTwo[0].removeAttribute('style')
          newSlideElementsThree[0].removeAttribute('style')
          newSlideElementsLink[0].removeAttribute('style')
          newSlide.removeAttribute('style')
          // reset all styles
          newSlideImage.removeAttribute('style')
          newSlideContent.removeAttribute('style')
          activeSlideImage.removeAttribute('style')
          q_slide.setAttribute('wait', 'false')

          if (auto) {
            this.autoPlay()
          }
        },
      })

      // caption animation
      if (q_slide.getAttribute('animate') != null) {
        let animation = q_slide.getAttribute('animate') || 'stagTop'

        if (q_slide.getAttribute('animate') === 'side') {
          animation = sideAnim
        }

        let letters = newSlide.querySelectorAll('.q_splitText')
        if (letters) {
          for (let i = letters.length - 1; i >= 0; i--) {
            let letter = letters[i]
            this.q_animate(letter, splitAnim, 100)
          }
        }

        // this.q_animate(newSlideElements, animation, 0.3)
        this.q_animate(newSlideElementsTwo, animation, 0.3)
        this.q_animate(newSlideElementsThree, animation, 0.9)
        this.q_animate(newSlideElementsLink, animation, 1)
      }
    },
    q_animate: function (element, animation, delay) {
      if (animation === 'stagTop') {
        gsap.fromTo(
          element,
          { alpha: 0, y: 100 },
          {
            duration: 1,
            alpha: 1,
            y: 0,
            ease: Expo.easeOut,
            delay: delay,
            stagger: 0.1,
          }
        )
      }

      if (animation === 'slideTop') {
        gsap.fromTo(
          element,
          { alpha: 0, y: 50 },
          { duration: 1.5, alpha: 1, y: 0, ease: Expo.easeOut, delay: delay }
        )
      } else if (animation === 'sideLeft') {
        gsap.fromTo(
          element,
          { alpha: 0, x: 120 },
          {
            duration: 1.5,
            alpha: 1,
            x: 0,
            ease: Expo.easeOut,
            delay: delay,
            stagger: 0.2,
          }
        )
      } else if (animation === 'sideRight') {
        gsap.fromTo(
          element,
          { alpha: 0, x: -120 },
          {
            duration: 1.5,
            alpha: 1,
            x: 0,
            ease: Expo.easeOut,
            delay: delay,
            stagger: 0.2,
          }
        )
      } else if (animation === 'clipRight') {
        gsap.to(element, {
          clipPath: 'inset(0px 0px 0px 0px)',
          ease: Expo.easeInOut,
          delay: delay,
          stagger: 0.1,
          duration: 1,
        })
      } else if (animation === 'splitLeft') {
        var content = element.textContent
        var letters = content.split('')
        element.innerHTML = ''

        for (var idx = 0; idx < letters.length; idx++) {
          element.innerHTML += '<span>' + letters[idx] + '</span>'
        }

        var chars = element.querySelectorAll('span')

        gsap.set(chars, { x: 110, alpha: 0 })

        setTimeout(function () {
          gsap.to(chars, {
            x: 0,
            alpha: 1,
            ease: Power4.easeInOut,
            stagger: 0.03,
            duration: 1.5,
          })
        }, delay)
      } else if (animation === 'splitRight') {
        var content = element.textContent
        var letters = content.split('')
        element.innerHTML = ''

        for (var idx = 0; idx < letters.length; idx++) {
          const char = letters[idx] === ' ' ? '\xa0' : letters[idx]
          element.innerHTML += '<span>' + char + '</span>'
        }

        var chars = element.querySelectorAll('span')

        gsap.set(chars, { x: -110, alpha: 0 })

        setTimeout(function () {
          gsap.to(chars, {
            x: 0,
            alpha: 1,
            ease: Power4.easeInOut,
            stagger: -0.03,
            duration: 1.5,
          })
        }, delay)
      }
    },
    clickPaging: function (e) {
      let slide = this.$refs.q_slide
      let pagination = slide.querySelector('.pagination')

      if (pagination) {
        this.q_slideSwitch(slide, this.indexInParent(e.target))
        this.triggerResize()
      }
    },
    clickNav: function (e, state) {
      let slide = this.$refs.q_slide
      let navigation = slide.querySelector('.navigation')

      if (navigation) {
        this.q_slideNext(slide, state)
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/utils/plugins/heroslider/style.scss';
</style>
