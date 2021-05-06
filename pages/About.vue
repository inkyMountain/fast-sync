<template>
  <div class="about">about{{ asyncData }}{{ time }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData() {
    const now = new Date()
    return {
      asyncData: 'xxx',
      time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    }
  },
})
</script>

<style lang="scss" scoped></style>
