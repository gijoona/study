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
    created: function () {
      this.getBreadCrumb()
    },
    data: function () {
      return {
        msg: ''
      }
    },
    methods: {
      getBreadCrumb: function () {
        return this.$http.get('/api/cmm/menulist').then((response) => {
          console.log(response);
        });
      }
    }
  }
</script>
