<template>
  <footer class="section__footer">
    <Reservation />
    <BlockFooter />
  </footer>
</template>
<script>
import Reservation from '~/components/footer/reservation'
import BlockFooter from '~/components/footer/block'
export default {
  name: 'Footer',
  data() {
    return {}
  },
  components: { Reservation, BlockFooter },
}
</script>
<style lang="scss"></style>
