<template>
  <base-template>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </base-template>
</template>

<script type="text/javascript">
import BaseTemplate from '@/components/BaseTemplate'
  export default {
    name: 'ExampleTemplate',
    components: {
      BaseTemplate
    }
  }
</script>
