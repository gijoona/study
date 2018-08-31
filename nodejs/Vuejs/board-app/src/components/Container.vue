<template>
  <b-container>
    <b-row>
      <b-col sm="3">
        <b-form v-if="show">
          <b-form-group id="formInput1" label="Code : " label-for="codeInput" description="Enter code">
            <b-form-input id="codeInput" type="text" v-model="form.code" required placeholder="Enter code" ></b-form-input>
          </b-form-group>
          <b-form-group id="formInput2" label="Category : " label-for="categorySelect" description="Select category">
            <b-form-select id="categorySelect" v-model="form.category" :options="categoryOpts" required ></b-form-select>
          </b-form-group>
          <b-form-group id="formInput3" label="Name : " label-for="nameInput" description="Enter name">
            <b-form-input id="nameInput" type="text" v-model="form.name" required placeholder="Enter name" ></b-form-input>
          </b-form-group>
          <b-form-group id="formInput4" label="Description" label-for="descText" description="Enter description" >
            <b-form-textarea id="descText" v-model="form.description" placeholder="Enter description" :max-rows="6" ></b-form-textarea>
          </b-form-group>
          <b-form-group id="formInput5" label="Use : " label-for="useCheck" description="Checked use" >
            <b-form-checkbox id="useCheck" v-model="form.use" value=true unchecked-value=false ></b-form-checkbox>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col sm="9">
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'Container',
  data: function () {
    return {
      msg: 'Container',
      fields: ['code', 'category', 'name', 'description', 'use'],
      items: [],
      categoryOpts: [
        { value: null, text: '-선택-' },
        { value: 'CAT001', text: '카테고리1' },
        { value: 'CAT002', text: '카테고리2' },
        { value: 'CAT003', text: '카테고리3' }
      ],
      form: {
        code: '',
        category: null,
        name: '',
        description: '',
        use: false
      },
      show: true
    }
  }
}
</script>
