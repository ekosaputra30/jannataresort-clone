<template>
  <section class="section section__theresort">
    <div v-if="dataresort" class="container section--inner">
      <div class="row row-lg-reverse theresort">
        <div class="w-12 w-lg-6">
          <div class="row flex-column theresort__content align-center h-100">
            <div class="theresort__title section__headline">
              <h2 v-html="dataresort.title"></h2>
            </div>
            <div class="theresort__description">
              <p v-html="dataresort.description"></p>
            </div>
            <div class="theresort__link">
              <a
                :href="dataresort.link.url"
                class="btn btn--green"
                v-html="dataresort.link.title"
              ></a>
            </div>
          </div>
        </div>
        <div class="w-12 w-lg-6">
          <div class="theresort__image">
            <img
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
export default {
  name: 'TheResort',
  props: ['dataresort'],
  data() {
    return {}
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
    &:before {
      content: '';

      background-color: #d8d6e2;
      height: calc(100% - 130px);
      position: absolute;
      top: 60px;
      right: -10%;
      width: 80%;
      z-index: -1;
    }
  }
  &__content {
    padding: {
      bottom: 30px;
      top: 50px;
    }
    @include media-breakpoint(md) {
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
    img {
      height: auto;
      max-width: 100%;
    }
  }
}
</style>
