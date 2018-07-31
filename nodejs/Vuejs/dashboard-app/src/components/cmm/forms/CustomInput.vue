<template>
  <input v-if="inputType !== 'object'" class="form-control" :type="inputType" v-model="inputVal" />
  <textarea v-else class="form-control" v-model="inputVal"></textarea>
</template>

<script>
  export default {
    name: 'CustomInput',
    props: ['value'],
    data: function () {
      return {
        inputVal: this.value
      }
    },
    watch: {
      inputVal: function (val) {
        this.$emit('input', val)
      }
    },
    computed: {
      inputType: function () {
        let type = 'text'
        switch (typeof(this.value)) {
          case 'string': type = 'text'
            break
          case 'number': type = 'number'
            break
          case 'boolean': type = 'checkbox'
            break
          default:
            type = typeof(this.value)
        }
        return type
      }
    }
  }
</script>
