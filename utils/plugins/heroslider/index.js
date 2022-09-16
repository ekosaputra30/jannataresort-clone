import { gsap, Expo, Power3, Power4 } from 'gsap'

function indexInParent(node) {
  var children = node.parentNode.childNodes
  var num = 0
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num
    if (children[i].nodeType == 1) num++
  }
  return -1
}

function eq(index) {
  if (index >= 0 && index < this.length) return this[index]
  else return -1
}

function headerAnimate() {
  var pageHeader = document.getElementById('page-top-banner')
  if (pageHeader) {
    var title = pageHeader.querySelector('.q_splitText')
    var text = pageHeader.querySelector('p')
    var btn = pageHeader.querySelector('.link')

    q_animate(title, 'splitLeft', 100)
    q_animate(text, 'slideTop', 1)
    if (btn) {
      q_animate(btn, 'slideTop', 1)
    }
  }
}

function q_animate(element, animation, delay) {
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
      element.innerHTML += '<span>' + letters[idx] + '</span>'
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
}

function animateText() {
  var lettr = document.getElementById('lettr')
  var lines = lettr.querySelectorAll('font')
  for (var x = lines.length - 1; x >= 0; x--) {
    var line = lines[x]
    lineHandler(line)
  }
  function lineHandler(line) {
    var text = line.textContent
    var wordSplit = text.split('')
    line.innerHTML = ''
    for (w = 0; w < wordSplit.length; w++) {
      line.innerHTML += '<span>' + wordSplit[w] + '</span>'
    }
    chars = line.querySelectorAll('span')
    for (var x = chars.length - 1; x >= 0; x--) {
      var char = chars[x]
      charHandler(char, x)
    }
    function charHandler(char, x) {
      char.style.transitionDelay = x * 0.1 + 's'
    }
  }
}

function qSlide(q_slide) {
  q_slide.classList.add('q_slide')

  // global vars

  var slides = q_slide.querySelectorAll('.slide')
  var pagination = q_slide.querySelector('.pagination')

  // trigger resize

  function triggerResize() {
    var ev = document.createEvent('HTMLEvents')
    ev.initEvent('resize', true, false)
    window.dispatchEvent(ev)
  }

  // autoplay function

  function autoPlay() {
    if (q_slide.getAttribute('autoplay') != null) {
      var q_slideDuration = q_slide.getAttribute('autoplay') || 6000
      var timeout = setTimeout(function () {
        q_slideNext(q_slide, false, true)
      }, q_slideDuration)
    }
  }

  // parallax init

  var q_slideFriction = 1 // no parallax
  if (q_slide.getAttribute('parallax') != null) {
    var q_slideFriction = q_slide.getAttribute('parallax') || 0.25
  }

  // opacity init

  if (q_slide.getAttribute('opacity') != null) {
    var slideOpacity = q_slide.getAttribute('opacity') || 0.6
  }

  // pagination update function

  function pageUpdate() {
    if (pagination) {
      var pages = pagination.querySelectorAll('.item')
      var activePage = pagination.querySelector('.q_current')
      var newSlide = q_slide.querySelector('.is-new')
      var index = indexInParent(newSlide)

      activePage.classList.remove('q_current')
      pages[index].classList.add('q_current')
    }
  }

  // switch slide function

  function q_slideSwitch(q_slide, index, auto) {
    if (q_slide.getAttribute('wait') === 'true') return

    var activeSlide = q_slide.querySelector('.q_current')
    var activeSlideImage = activeSlide.querySelector('.image-container')
    var newSlide = eq.call(slides, index)
    var newSlideImage = newSlide.querySelector('.image-container')
    var newSlideContent = newSlide.querySelector('.slide-content')
    var newSlideElements = newSlide.querySelectorAll('.caption > h1')
    var newSlideElementsTwo = newSlide.querySelectorAll('.caption > h2')
    var newSlideElementsThree = newSlide.querySelectorAll('.caption > p')

    if (newSlide === activeSlide) return

    newSlide.classList.add('is-new')

    var timeout = 0
    clearTimeout(timeout)
    pageUpdate()

    q_slide.setAttribute('wait', 'true')

    if (indexInParent(newSlide) > indexInParent(activeSlide)) {
      // next slide
      var newSlideRight = 0
      var newSlideLeft = 'auto'
      var newSlideImageLeft =
        -q_slide.clientWidth * (1 - q_slideFriction) + 'px'
      var newSlideContentLeft = 'auto'
      var newSlideContentRight = 0
      var activeSlideImageLeft = -q_slide.clientWidth * q_slideFriction + 'px'
      var sideAnim = 'sideLeft'
      var splitAnim = 'splitLeft'
    } else {
      // prev slide
      var newSlideRight = ''
      var newSlideLeft = 0
      var newSlideImageLeft = -q_slide.clientWidth * q_slideFriction + 'px'
      var newSlideContentLeft = 0
      var newSlideContentRight = 'auto'
      var activeSlideImageLeft = q_slide.clientWidth * q_slideFriction + 'px'
      var sideAnim = 'sideRight'
      var splitAnim = 'splitRight'
    }

    newSlide.style.display = 'block'
    newSlide.style.width = 0
    newSlide.style.right = newSlideRight
    newSlide.style.left = newSlideLeft
    newSlide.style.zIndex = 2

    newSlideImage.style.width = q_slide.clientWidth + 'px'
    activeSlideImage.style.transform = 'translateX(0)'

    gsap.set(newSlideImage, { x: newSlideImageLeft })

    if (slideOpacity) {
      newSlideImage.style.opacity = slideOpacity
    }

    newSlideContent.style.width = q_slide.clientWidth + 'px'
    newSlideContent.style.right = newSlideContentRight
    newSlideContent.style.left = newSlideContentLeft

    if (slideOpacity) {
      gsap.to(activeSlideImage, 1.5, {
        x: activeSlideImageLeft,
        opacity: slideOpacity,
        ease: Expo.easeInOut,
      })
    } else {
      gsap.to(activeSlideImage, 1.5, {
        x: activeSlideImageLeft,
        ease: Expo.easeInOut,
      })
    }

    gsap.to(newSlide, 1.5, {
      width: q_slide.clientWidth,
      ease: Expo.easeInOut,
    })

    gsap.to(newSlideImage, 1.5, {
      x: 0,
      opacity: 1,
      ease: Expo.easeInOut,
      onComplete: function () {
        // switch active class
        newSlide.classList.add('q_current')
        newSlide.classList.remove('is-new')
        activeSlide.classList.remove('q_current')
        newSlideElements[0].removeAttribute('style')
        newSlideElementsTwo[0].removeAttribute('style')
        newSlideElementsThree[0].removeAttribute('style')
        newSlide.removeAttribute('style')
        // reset all styles
        newSlideImage.removeAttribute('style')
        newSlideContent.removeAttribute('style')
        activeSlideImage.removeAttribute('style')
        q_slide.setAttribute('wait', 'false')

        if (auto) {
          autoPlay()
        }
      },
    })

    // caption animation

    if (q_slide.getAttribute('animate') != null) {
      var animation = q_slide.getAttribute('animate') || 'stagTop'

      if (q_slide.getAttribute('animate') === 'side') {
        var animation = sideAnim
      }

      var letters = newSlide.querySelectorAll('.q_splitText')
      if (letters) {
        for (var i = letters.length - 1; i >= 0; i--) {
          var letter = letters[i]
          q_animate(letter, splitAnim, 100)
        }
      }

      q_animate(newSlideElements, animation, 0.3)
      q_animate(newSlideElementsTwo, animation, 0.9)
      q_animate(newSlideElementsThree, animation, 1.2)
    }
  }

  // next/prev slide switch calls

  function q_slideNext(q_slide, previous, auto) {
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
    q_slideSwitch(q_slide, indexInParent(newSlide), auto)

    triggerResize()
  }

  document.addEventListener('DOMContentLoaded', function () {
    for (var i = slides.length - 1; i >= 0; i--) {
      var slide = slides[i]
      slide.classList.add('is-loaded')
    }

    // pagination click event

    if (pagination) {
      var pages = pagination.querySelectorAll('.item')
      for (var i = pages.length - 1; i >= 0; i--) {
        var page = pages[i]
        page.addEventListener('click', function (e) {
          q_slideSwitch(q_slide, indexInParent(e.target))
          triggerResize()
        })
      }
    }

    autoPlay() // autoplay init
  })

  init()
}

function init() {
  var loadOverlay = document.getElementById('overlay_body')

  function id(v) {
    return document.getElementById(v)
  }

  function className(v) {
    return document.getElementsByClassName(v)
  }

  if (loadOverlay) {
    ;(function () {
      function loadbar() {
        var cont = className('content_outer_wraper'),
          ovrl = id('overlay_body'),
          logo = id('img_logo'),
          cvrl = id('content-overlay'),
          pvrl = id('progress-overlay'),
          itms = id('loading-items'),
          imgOverlay = className('img_overlay'),
          loaderHolder = className('loader_holder'),
          loaderLine = className('load_line'),
          imgBefore = className('load_img'),
          lettersLoad = id('progstat'),
          c = 0,
          img = document.images,
          tot = img.length

        if (tot == 0) {
          setTimeout(function () {
            doneLoading()
          }, 2000)
        }

        setTimeout(function () {
          gsap.to(imgOverlay, { opacity: 1, duration: 0, delay: 0 })
          gsap.to(logo, {
            opacity: 1,
            ease: Expo.easeInOut,
            duration: 0,
            delay: 0,
          })
          gsap.to(lettersLoad, {
            opacity: 1,
            ease: Expo.easeInOut,
            duration: 0,
            delay: 0,
          })
        }, 100)

        setTimeout(function () {
          gsap.to(cont, { opacity: 1, ease: Expo.easeInOut, delay: 0.5 })
        }, 250)

        setTimeout(function () {
          gsap.to(imgBefore, {
            opacity: 1,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.5,
          })
        }, 500)

        if (matchMedia('only screen and (max-width: 991px)').matches) {
          gsap.to(lettersLoad, {
            letterSpacing: '1px',
            opacity: 1,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1,
          })
        } else {
          gsap.to(lettersLoad, {
            letterSpacing: '3px',
            opacity: 1,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1,
          })
        }

        gsap.to(loaderLine, { scaleX: 1, opacity: 1, delay: 0.5, duration: 2 })
        gsap.to(imgOverlay, {
          height: 0,
          opacity: 1,
          ease: Expo.easeInOut,
          delay: 0,
          duration: 1,
        })
        gsap.to(imgBefore, {
          opacity: 1,
          ease: Expo.easeInOut,
          delay: 0,
          duration: 1,
        })

        function imgLoaded() {
          c += 1
          var perc = ((100 / tot) * c) << 0

          if (c === tot) {
            setTimeout(function () {
              doneLoading()
            }, 1000)
          }
        }

        function doneLoading() {
          gsap.to(loaderHolder, {
            width: 0,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.5,
          })
          gsap.to(ovrl, {
            width: 0,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.5,
          })
          gsap.to(pvrl, {
            width: 0,
            ease: Expo.easeInOut,
            delay: 0.6,
            duration: 1.5,
          })
          gsap.to(cvrl, {
            alpha: 0,
            ease: Power3.easeInOut,
            delay: 0.6,
            duration: 1.5,
          })
          gsap.to(itms, {
            alpha: 0,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.3,
          })
          setTimeout(function () {
            ovrl.style.display = 'none'
            cvrl.style.display = 'none'
          }, 2200)
        }
        for (var i = 0; i < tot; i++) {
          var tImg = new Image()
          tImg.onload = imgLoaded
          tImg.onerror = imgLoaded
          tImg.src = img[i].src
        }
      }

      document.addEventListener('DOMContentLoaded', loadbar, false)
    })()
  }

  var loadOverlayInsidePage = document.getElementById('inside_page_loader')

  if (loadOverlayInsidePage) {
    ;(function () {
      function insidePageLoad() {
        var cont = className('content_outer_wraper'),
          ovrlInside = id('inside_page_loader'),
          contentTop = className('inside_page_content'),
          bannerInside = className('inside_page_banner'),
          headingBottom = className('spilt_text_bottom')
        // headingBottom = className('spilt_text_bottom');
        // headingBottomBefore	= getBefore('spilt_text_bottom');

        gsap.to(ovrlInside, {
          opacity: 0,
          zIndex: -1,
          ease: Expo.easeInOut,
          delay: 0.5,
          duration: 0,
        })

        gsap.to(headingBottom, {
          className: '+=show',
          ease: Expo.easeInOut,
          delay: 2,
          duration: 1.4,
        })

        var bannerText = document.getElementById('inside_page_banner')

        if (bannerText) {
          function bannerTextAnim() {
            var headTop = bannerText.querySelector('.heading.top'),
              headBottom = bannerText.querySelector('.heading.bottom'),
              headBottomOne = bannerText.querySelector('.heading.bottom.one'),
              headBottomTwo = bannerText.querySelector('.heading.bottom.two')
            q_animate(headTop, 'splitLeft', 800)
            q_animate(headBottom, 'splitLeft', 1500)
          }

          bannerTextAnim()
        }

        setTimeout(function () {
          gsap.to(cont, {
            opacity: 1,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.4,
          })
          gsap.to(bannerInside, 1.5, {
            opacity: 1,
            y: 0,
            ease: Expo.easeInOut,
            delay: 0.5,
            duration: 1.5,
          })
          gsap.to(contentTop, 2, {
            opacity: 1,
            y: 0,
            ease: Expo.easeInOut,
            delay: 0.6,
            duration: 2,
          })
        }, 250)
      }

      document.addEventListener('DOMContentLoaded', insidePageLoad, false)
    })()
  }
}

const SlideshowRun = () => {
  var q_slide = document.getElementById('q_slide')

  if (q_slide) {
    qSlide(q_slide)
  }
}

// init()

// module.exports = { run }
export default SlideshowRun
// export default SlideShow
