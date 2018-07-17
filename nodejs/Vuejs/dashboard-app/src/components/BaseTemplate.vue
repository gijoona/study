<template>

<div>
  <!-- Navigation-->
  <navigation></navigation>
  <!-- END navigation -->
  <!-- Contents -->
  <div class="content-wrapper">
    <slot></slot>
  </div>
  <!-- END Contents -->
</div>
</template>

<script>
import Navigation from '@/components/include/Navigation'

export default {
  name: 'BaseTemplate',
  data: function () {
    return {}
  },
  components: {
    Navigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
