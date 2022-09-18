<template>
  <header class="header">
    <div class="container section--inner">
      <div class="row header__logo">
        <a href="" class="d-block header__logolink">
          <img :src="logo" alt="Logo" />
        </a>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      logo: '/logo.png',
    }
  },
}
</script>
<style lang="scss">
@import '~assets/styles/mixins.scss';
.header {
  background-color: #323037;
  display: block;
  height: 80px;
  position: absolute;
  width: 100%;
  z-index: 1030;

  &__logo {
    height: 100%;
    margin: 10px auto;
    width: 70px;

    &link {
      height: 100%;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  @include media-breakpoint(lg) {
    height: auto;
    &__logo {
      align-items: center;
      background-color: transparent;
      display: flex;
      height: auto;
      justify-content: center;
      left: 0;
      position: absolute;
      right: 0;
      top: 80px;
      width: auto;

      &link {
        max-width: 120px;
      }
    }
  }
}
</style>
