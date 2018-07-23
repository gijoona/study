<template>
  <footer class="sticky-footer">
    <div class="container">
      <div class="text-center">
        <small>{{ copyright }}</small>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'IncFooter',
    data: function () {
      return {
        copyright: 'Copyright © Your Website 2018'
      }
    }
  }
</script>
