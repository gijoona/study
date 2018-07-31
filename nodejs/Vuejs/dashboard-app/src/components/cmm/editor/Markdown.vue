<template>
  <textarea class="form-control"></textarea>
</template>

<script>
  export default {
    name: 'Markdown',
    props: ['value'],
    data: function () {
      return {
        editVal: this.value
      }
    },
    watch: {
      editVal: function (val) {
        this.$emit('edit', val)
      }
    }
  }
</script>
