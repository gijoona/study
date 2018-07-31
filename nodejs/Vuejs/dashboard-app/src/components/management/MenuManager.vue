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
  import CustomDataTable from '@/components/cmm/datatables/CustomDataTable'

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
      'data-tables': CustomDataTable
    }
  }
</script>
