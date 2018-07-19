<template>
  <div>
    <div v-for="num of goodsNum" :key="num">
      <goods-item :goods-num="num" @sum="sumTotalCnt"></goods-item>
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
    <input type="number" :id="'goods_' + goodsNum" :value="goodsCnt">
    <label :for="'goods_' + goodsNum">goods_1
      <span v-if="goodsCnt === 0">Solt Out</span>
    </label>
    <button type="button" name="button" @click="addCount">Add</button>
  </div>
  `,
  props: ['goodsNum'],
  data: function () {
    return {
      goodsCnt: 0
    }
  },
  methods: {
    addCount: function () {
      this.goodsCnt = this.goodsCnt + 1
      this.$emit('sum', this.goodsCnt)
    }
  }
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      totalCnt: 0,
      goodsNum: 4
    }
  },
  components: {
    'goods-item': goodsItem
  },
  methods: {
    sumTotalCnt: function (goodsCnt) {
      this.totalCnt = this.totalCnt + goodsCnt
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
