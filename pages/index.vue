<template>
  <div class="container">
    <button @click="onButtonClick">to about</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    onButtonClick() {
      this.$router.push('/about')
    },
  },
})
</script>

<style></style>
