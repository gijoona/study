<template>
  <base-template>
    <router-view></router-view>
  </base-template>
</template>

<script>
  import BaseTemplate from '@/components/BaseTemplate'

  export default {
    name: 'MngTemplate',
    components: {
      BaseTemplate
    }
  }
</script>
