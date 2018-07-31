<template>
  <div class="card mb-3">
    <div class="card-header">
      {{ headerText }}
      <span class="pull-right btn-toolbar">
        <span class="btn-group mx-1" role="group">
          <button type="button" class="btn btn-sm btn-default" @click="resetMenu">Reset</button>
          <button type="button" class="btn btn-sm btn-default" @click="newMenu">New</button>
          <button type="button" class="btn btn-sm btn-default" @click="deleteMenu">Delete</button>
        </span>
        <span class="btn-group mx-1" role="group">
          <button type="button" class="btn btn-sm btn-default" @click="saveMenu">Save</button>
        </span>
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
              <custom-input v-model="dataList[idx][header]"></custom-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomDataTable',
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
      },
      resetMenu: function () {
        console.log('resetMenu')
      },
      newMenu: function () {
        let newData = {}
        this.headerArr.map(arg => newData[arg] = '')
        this.dataList.push(newData)
      },
      saveMenu: function () {
        console.log('saveMenu')
      },
      deleteMenu: function () {
        console.log('deleteMenu')
      }
    },
    updated: function () {
      this.$nextTick(function () {
        if (this.dataList !== undefined) {
          // this.ds = Object.assign([], this.dataList)
          // this.ds = this.dataList
          this.setHeaderArr()
          console.log(this.dataList)
        }
      })
    }
  }
</script>
