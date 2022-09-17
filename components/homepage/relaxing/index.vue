<template>
  <section
    v-if="datarelaxing"
    class="section section--bgimage section__relaxing"
  >
    <div
      class="bg"
      v-bind:style="{
        'background-image': `url(${datarelaxing.featured.aws_file_url}/${datarelaxing.featured.path}/${datarelaxing.featured.filename.big})`,
      }"
    ></div>
    <div class="container section--inner">
      <div class="row relaxing">
        <div class="row flex-column relaxing__content">
          <div class="relaxing__title section__headline">
            <h2>
              <span v-html="datarelaxing.title"></span>
            </h2>
          </div>
          <div class="relaxing__description">
            <p v-html="datarelaxing.description"></p>
          </div>
          <div class="relaxing__link">
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
export default {
  name: 'TheRelaxing',
  props: ['datarelaxing'],
  data() {
    return {}
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
