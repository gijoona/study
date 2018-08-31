<template>
  <div>
    <b-container>
      <b-row>
        <b-button variant="primary" @click="getList">조회</b-button>
      </b-row>
      <b-row>
        <b-table striped hover
          :items="boards"
          @row-clicked="rowClick"
          show-empty>
        </b-table>
      </b-row>
      <b-row>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="formInputGroup1"
                        label="Name:"
                        label-for="formInput1"
                        description="제목.">
            <b-form-input id="formInput1"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="formInputGroup2"
                        label="Category:"
                        label-for="formInput2"
                        description="카테고리.">
            <b-form-select id="formInput2"
                          :options="categories"
                          required
                          v-model="form.category">
            </b-form-select>
          </b-form-group>
          <b-form-group id="formInputGroup3"
                        label="Contents :"
                        label-for="formInput3">
            <b-form-textarea id="formInput3"
                            v-model="form.contents"
                            placeholder="Enter something"
                            :rows="3"
                            :max-rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-form-group id="formInputGroup4"
                        label="Description :"
                        label-for="formInput4">
            <b-form-textarea id="formInput4"
                            v-model="form.description"
                            placeholder="Enter description"
                            :rows="3"
                            :max-rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-button type="reset" variant="default">초기화</b-button>
          <b-button type="submit" variant="primary">저장</b-button>
          <b-button type="button" variant="danger" @click="onDelete">삭제</b-button>
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
        id: null,
        email: '',
        name: '',
        category: null,
        contents: '',
        description: ''
      },
      categories: [
        { text: '-선택-', value: null },
        { text: '취미', value: 'HOB' },
        { text: '개발', value: 'DEV' },
        { text: '공부', value: 'EDU' }
      ],
      show: true
    }
  },
  methods: {
    getList: function () {
      this.$http.get('http://35.200.103.250:8000/board').then((res) => {
        this.boards = res.data.results
      })
    },
    rowClick: function (item, index, event) {
      this.form = Object.assign({}, item)
    },
    onSubmit (evt) {
      evt.preventDefault()
      let request = {
        url: 'http://35.200.103.250:8000/board',
        form: this.form,
        config: { headers: { 'Content-Type': 'application/json' } }
      }
      if (this.form.id != null) {
        console.log('modify')
        this.$http.put(request.url, request.form, request.config).then((res) => {
          console.log(res)
          this.getList()
        })
      } else {
        console.log('register')
        this.$http.post(request.url, request.form, request.config).then((res) => {
          this.getList()
        })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.id = null
      this.form.email = ''
      this.form.name = ''
      this.form.category = null
      this.form.contents = ''
      this.form.description = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    onDelete () {
      // evt.preventDefault()
      this.$http.delete('http://35.200.103.250:8000/board?id=' + this.form.id).then((res) => {
        this.getList()
      })
    }
  }
}
</script>
