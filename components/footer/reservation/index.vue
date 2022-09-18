<template>
  <section
    class="section section--bgimage section__reservation"
    ref="reservationel"
  >
    <div
      ref="bg"
      class="bg"
      v-bind:style="{
        'background-image': `url(${bgImage})`,
      }"
    ></div>
    <div class="container section--inner">
      <div class="row reservation">
        <div class="w-12 w-lg-6 w-offset-lg-6 reservation__form">
          <div class="reservation__formblock row calendar">
            <div class="calendar__in w-6">
              <input
                type="date"
                id="checkin"
                class="calendar"
                @click="triggerCalendar($event)"
              />
            </div>
            <div class="calendar__out w-6">
              <input
                type="date"
                id="checkout"
                class="calendar"
                @click="triggerCalendar($event)"
              />
            </div>
          </div>
          <div class="reservation__formblock input row">
            <div class="w-12 w-lg-6 input__adults">
              <label>adult(s)</label>
              <div class="block">
                <div class="input__increase input__adults_increase">-</div>
                <input type="number" value="1" name="adult" id="" min="0" />
                <div class="input__decrease input__adults_decrease">+</div>
              </div>
            </div>
            <div class="w-12 w-lg-6 input__children">
              <label>children</label>
              <div class="block">
                <div class="input__increase input__children_increase">-</div>
                <input type="number" value="1" name="child" id="" min="0" />
                <div class="input__decrease input__children_decrease">+</div>
              </div>
            </div>
          </div>
          <div class="reservation__formbutton row">
            <div class="w-12 w-lg-6">
              <a href="" class="btn btn--green-fill"
                >Rates &amp; Availability</a
              >
            </div>
            <div class="w-12 w-lg-6">
              <a href="" class="btn btn--white">Discover Our Exclusive Deals</a>
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
  name: 'Reservation',
  data() {
    return {
      mainTL: null,
      bgImage: '/img/bg-reservation.jpg',
    }
  },
  mounted() {
    this.theMotion()
  },
  created() {},
  updated() {
    // this.theMotion()
  },
  methods: {
    getRatio(el) {
      window.innerHeight / (window.innerHeight + el.offsetHeight)
    },
    theMotion() {
      let bg = this.$refs.bg
      this.mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.reservationel,
          scrub: false,
          start: 'center bottom',
          onUpdate: function (self) {
            gsap.set(bg, { top: self.scroll() - bg.parentElement.offsetTop })
          },
        },
      })

      this.mainTL.fromTo(
        bg,
        {
          backgroundPosition: `50% 0px`,
        },
        {
          backgroundPosition: `50% ${-innerHeight / 2}`,
          ease: 'none',
        }
      )
    },
    triggerCalendar(event) {
      let datepicker = event.target
      return datepicker.showPicker()
    },
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
.section__reservation {
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
.reservation {
  align-items: center;
  height: 120vh;
  justify-content: center;
  position: relative;
  &__formblock {
    input {
      background-color: transparent;
      border: 0;
      color: #679334;
      margin: 0;
      outline: none;
      padding: 0;
      text-transform: uppercase;
      width: 100%;
    }
  }
  &__formbutton {
    margin-top: 30px;
    .btn {
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 12px 15px;
      text-align: center;
      width: 100%;
      &--white {
        padding: {
          bottom: 50px;
          top: 50px;
        }
        text-align: center;
      }
      @include media-breakpoint(md) {
        width: calc(100% - 10px);
        &--white {
          padding: {
            bottom: 0;
            top: 0;
          }
          text-align: left;
          margin-left: auto;
        }
      }
    }
  }
}
.calendar {
  margin-bottom: 15px;

  &__in,
  &__out {
    width: 100%;
  }
  input {
    border: 1px solid #679334;
    padding: 16px;
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
      opacity: 0;
      -webkit-appearance: none;
    }
  }

  &__in,
  &__out {
    input {
      width: calc(100% - 10px);
    }
  }
  &__out {
    input {
      margin-left: 10px;
    }
  }
}
.input {
  label {
    color: white;
    text-transform: uppercase;
  }
  .block {
    border: 1px solid #679334;
    display: flex;
    flex-direction: row;
    padding: 16px;
    input {
      text-align: center;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  &__increase,
  &__decrease {
    color: white;
    font-size: 20px;
    line-height: 1;
  }
  &__adults,
  &__children {
    margin-bottom: 15px;
  }
  @include media-breakpoint(md) {
    &__adults {
      padding-right: 10px;
    }
    &__children {
      padding-left: 10px;
    }
  }
}
</style>
