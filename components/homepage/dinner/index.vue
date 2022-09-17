<template>
  <section class="section section__dinner">
    <div v-if="datadinner" class="container section--inner">
      <div class="row dinner">
        <div class="w-12">
          <div class="dinner__image">
            <img
              :src="`${datadinner.featured.aws_file_url}/${datadinner.featured.path}/${datadinner.featured.filename.big}`"
              :alt="datadinner.description"
            />
          </div>
        </div>
        <div class="row flex-column dinner__content">
          <div class="dinner__title section__headline">
            <h2>
              <span v-html="datadinner.title_one"></span>
              <span v-html="datadinner.title_two"></span>
            </h2>
          </div>
          <div class="dinner__description">
            <p v-html="datadinner.description"></p>
          </div>
          <div class="dinner__link">
            <a
              :href="datadinner.link.url"
              class="btn btn--green"
              v-html="datadinner.link.title"
            ></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TheDinner',
  props: ['datadinner'],
  data() {
    return {}
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
