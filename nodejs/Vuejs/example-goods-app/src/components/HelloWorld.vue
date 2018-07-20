<template>
  <div>
    <div v-for="(val, idx) of goodsCntArr" :key="idx">
      <goods-item :goods-num="idx" @sum="sumTotalCnt"></goods-item>
    </div>
    <br />
    <div>
      total goods count: {{ this.totalCnt }}
    </div>
  </div>
</template>

<script>
let goodsItem = {
  template: `
  <div>
    <input type="number" :id="'goods_' + goodsNum" v-model="cnt" @change="changeCount">
    <label :for="'goods_' + goodsNum">goods_{{goodsNum}}
      <span v-if="cnt === 0">Solt Out</span>
    </label>
    <button type="button" name="button" @click="addCount">Add</button>
  </div>
  `,
  props: ['goodsNum'],
  data: function () {
    return {
      cnt: 0,
      num: this.goodsNum
    }
  },
  methods: {
    addCount: function () {
      this.cnt += 1
      this.emitClickEvent()
    },
    changeCount: function () {
      if (this.cnt === '') {
        this.cnt = 0
      }
      this.emitClickEvent()
    },
    emitClickEvent: function () {
      this.$emit('sum', this.$data)
    }
  }
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      totalCnt: 0,
      goodsCntArr: [0, 0, 0, 0]
    }
  },
  components: {
    'goods-item': goodsItem
  },
  methods: {
    sumTotalCnt: function (goods) {
      this.goodsCntArr[goods.num] = goods.cnt
      this.totalCnt = this.goodsCntArr.reduce((prev, curr) => parseInt(prev) + parseInt(curr))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
