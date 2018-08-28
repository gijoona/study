<template>
  <div>
    <b-container>
      <b-row>
        <b-button variant="primary" @click="getList">조회</b-button>
      </b-row>
      <b-row>
        <b-table striped hover
          :items="boards"
          show-empty>
        </b-table>
      </b-row>
      <b-row>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="exampleInputGroup1"
                        label="Email address:"
                        label-for="exampleInput1"
                        description="We'll never share your email with anyone else.">
            <b-form-input id="exampleInput1"
                          type="email"
                          v-model="form.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Your Name:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup3"
                        label="Food:"
                        label-for="exampleInput3">
            <b-form-select id="exampleInput3"
                          :options="foods"
                          required
                          v-model="form.food">
            </b-form-select>
          </b-form-group>
          <b-form-group id="exampleGroup4">
            <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
              <b-form-checkbox value="me">Check me out</b-form-checkbox>
              <b-form-checkbox value="that">Check that out</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button type="submit" variant="primary">작성</b-button>
          <b-button type="reset" variant="danger">초기화</b-button>
        </b-form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  name: 'Board',
  data: function () {
    return {
      fields: ['name', 'category', 'contents', 'description'],
      boards: [],
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    getList: function () {
      this.$http.get('http://35.200.103.250:8000/board').then((res) => {
        console.log(res.data)
        if (res.data.errorcode === 1) {
          console.log(res.data.errormessage)
        } else {
          this.boards = res.data.results
        }
      })
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
