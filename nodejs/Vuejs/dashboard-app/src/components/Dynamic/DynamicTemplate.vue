<template>
  <base-template>
    <component :is="viewName"></component>
  </base-template>
</template>

<script>
  import BaseTemplate from '@/components/BaseTemplate'
  import Dashboard from '@/components/Dashboard'
  import MenuManager from '@/components/mng/MenuManager'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DynamicTemplate',
    data: function () {
      return {
        tempMsg: 'DynamicTemplate'
      }
    },
    methods: {
      ...mapGetters([
        'getViewName'
      ])
    },
    computed: {
      viewName: function () {
        return this.getViewName()
      }
    },
    components: {
      BaseTemplate,
      Dashboard,
      MenuManager
    }
  }
</script>
