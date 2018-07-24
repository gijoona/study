<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="#">Dashboard</a>
    </li>
    <li class="breadcrumb-item active">My Dashboard</li>
  </ol>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data: function () {
      return {
        breadcrumbMsg: 'test'
      }
    },
    methods: {
      getBreadcrumb: function (menuItem) {
        let encodingMenuId = encodeURIComponent(menuItem['@rid'])
        return this.$http.get('/api/cmm/breadcrumb/' + encodingMenuId).then(function (result) {
          console.log(result)
        })
      }
    },
    created: function () {
      this.$EventBus.$on('menu-selected', (menuItem) => this.getBreadcrumb(menuItem))
    }
  }
</script>
