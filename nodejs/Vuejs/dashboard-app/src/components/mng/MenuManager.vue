<template>
  <div class="row">
    <div class="col-sm-4">
      <div class="card mb-3">
        <div class="card-header">
          tree header
        </div>
        <div class="card-body">
          <tree-view
            :model="menuList"
            category="child"
            :selection="selection"
            :onSelect="onSelect"
            :display="display"
          />
        </div>
      </div>
    </div>
    <div class="col-sm-8">
      <data-tables :dataList="menuList"></data-tables>
    </div>
  </div>
</template>

<script>
  import { TreeView } from '@bosket/vue'  // Bosket library.

  let dataTables = {
    name: 'DataTables',
    template: `
      <div class="card mb-3">
        <div class="card-header">
          {{ headerText }}
        </div>
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="item of dataList">
                <td>Shad Decker</td>
                <td>Regional Director</td>
                <td>Edinburgh</td>
                <td>51</td>
                <td>2008/11/13</td>
                <td>$183,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    props: ["dataList"],
    data: function () {
      return {
        headerText: 'dataTables'
      }
    },
    methods: {
      headerArr: function () {
        console.log(this.dataList)
        this.dataList.forEach(item => console.log(item))
      }
    },
    created: function () {
      this.headerArr()
    }
  }

  export default {
    name: 'MenuManager',
    data: function () {
      return {
        selection: [],
        menuList: []
      }
    },
    methods: {
      getMenuList: function () {
        return this.$http.get('/api/cmm/menulist').then((response) => {
          this.menuList = response.data
        })
      },
      onSelect: function (newSelection) {
        this.selection = newSelection
      },
      display: function (item) {
        return item.title
      }
    },
    created: function () {
      this.getMenuList()
    },
    components: {
      "tree-view": TreeView,
      'data-tables': dataTables
    }
  }
</script>
