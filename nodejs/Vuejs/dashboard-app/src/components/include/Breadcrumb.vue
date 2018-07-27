<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(val, idx) in breadcrumbs" :key="idx">
      <b v-if="idx == breadcrumbs.length - 1">{{ val }}</b>
      <a v-else href="#">{{ val }}</a>
    </li>
    <!-- <li class="breadcrumb-item active">My Dashboard</li> -->
  </ol>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Breadcrumb',
    data: function () {
      return {
        breadcrumbMsg: 'test'
      }
    },
    methods: {
      ...mapGetters([
        'getBreadcrumbs'
      ])
    },
    computed: {
      breadcrumbs: function () {
        return this.getBreadcrumbs()
      }
    }
  }
</script>
