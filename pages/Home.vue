<template>
  <div class='home'>
    home
    <nuxt-link to='/test'>to test</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types'

export default Vue.extend({
  name: 'home',
  async fetch({ app }: Context) {},
  async asyncData() {},
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.home {

}
</style>
