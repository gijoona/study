<template>
  <div class="row">
    <div class="col-sm-3">
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
    <div class="col-sm-9">
      <data-tables :dataList="childList"></data-tables>
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
          <span class="pull-right btn-group" role="group">
            <button type="button" class="btn btn-sm btn-default">New</button>
            <button type="button" class="btn btn-sm btn-default">Save</button>
            <button type="button" class="btn btn-sm btn-default">Delete</button>
          </span>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th v-for="header of headerArr">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th v-for="header of headerArr">
                  {{ header }}
                </th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(item, idx) in dataList">
                <td v-for="header of headerArr">
                  <input class="form-control" v-model="dataList[idx][header]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    props: ["dataList"],
    data: function () {
      return {
        headerText: 'dataTables',
        headerArr: []
      }
    },
    methods: {
      setHeaderArr: function () {
        this.dataList.forEach(
          item => Object.keys(item).forEach(
            key => this.headerArr.includes(key) ? '' : this.headerArr.push(key)
          )
        )
      }
    },
    updated: function () {
      this.$nextTick(function () {
        if (this.dataList !== undefined) {
          this.setHeaderArr()
        }
      })
    }
  }

  export default {
    name: 'MenuManager',
    data: function () {
      return {
        selection: [],
        menuList: [],
        childList: []
      }
    },
    methods: {
      getMenuList: function () {
        return this.$http.get('/api/cmm/menulist').then((response) => {
          this.menuList = response.data
          this.childList = response.data
        })
      },
      onSelect: function (newSelection) {
        this.selection = newSelection
        this.childList = newSelection[0].hasOwnProperty('child') ? newSelection[0].child : undefined
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
