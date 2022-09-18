import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      locoScroll: undefined,
      mainTL: undefined,
    }
  },

  beforeDestroy() {
    if (typeof this.locoScroll !== 'undefined') {
      this.locoScroll.destroy()
    }
  },

  destroyed() {
    this.locoScroll.update()
    window.removeEventListener('resize', this.onlocoScrollResize)
  },

  mounted() {
    this.$nextTick(() => {
      this.enableLocomotiveScroll()
    })
  },

  methods: {
    enableLocomotiveScroll() {
      if (process.client && typeof this.locoScroll === 'undefined') {
        this.locoScroll = new this.LocomotiveScroll({
          el: this.$refs.locoScroll,
          smooth: true,
        })

        this.smooth(this.locoScroll, this.$refs.locoScroll)

        setTimeout(() => {
          this.locoScroll.update()
        }, 1000)
      }
    },
    smooth(scroll, el) {
      gsap.registerPlugin(ScrollTrigger)
      scroll.on('scroll', ScrollTrigger.update)
      ScrollTrigger.scrollerProxy(el, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : +scroll.scroll.instance.scroll.y.toFixed(4)
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
        pinType: el.style.transform ? 'transform' : 'fixed',
      })
      ScrollTrigger.defaults({ scroller: el })
      ScrollTrigger.addEventListener('refresh', () => scroll.update())
      ScrollTrigger.refresh()
    },
    onlocoScrollResize() {
      this.locoScroll.update()
    },
    resizeSectionsObserver(elements) {
      const resizeCallback = () => {
        this.locoScroll.update()
      }
      const observer = new ResizeObserver(resizeCallback)
      elements.forEach((el) => {
        observer.observe(el)
      })
    },
    initTimeline(el) {
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scrub: 1,
          start: 'top bottom',
          end: '+=400',
          toggleActions: 'play none reverse none',
        },
      })

      return this.mainTL
    },
  },
  updated() {
    this.locoScroll.update()
  },
}
