<template>
  <div class='test'>
    test
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  name: 'Test',
  async fetch({ app }: Context) {},
  async asyncData() {
    console.log('asyncData in Test Component')
  },
  data() {
    return {}
  },
})
</script>

<style lang='scss' scoped>
.test {

}
</style>
