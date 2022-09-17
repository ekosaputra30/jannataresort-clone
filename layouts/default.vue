<template>
  <div>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/footer'
export default {
  name: 'Default',
  components: { Footer },
}
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
