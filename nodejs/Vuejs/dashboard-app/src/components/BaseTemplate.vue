<template>
  <div>
    <!-- Navigation-->
    <inc-nav></inc-nav>
    <!-- END navigation -->

    <!-- Contents -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumbs-->
        <breadcrumb></breadcrumb>
        <!-- END Breadcrumbs-->

        <slot></slot>

      </div>
    </div>
    <!-- END Contents -->

    <!-- Footer -->
    <inc-footer></inc-footer>
    <!-- END Footer -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <font-awesome-icon icon="angle-up" />
    </a>
    <!-- Logout Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                                              <span aria-hidden="true">×</span>
                                                            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IncNav from '@/components/include/IncNav'
import Breadcrumb from '@/components/include/Breadcrumb'
import IncFooter from '@/components/include/IncFooter'

export default {
  name: 'BaseTemplate',
  data: function () {
    return {}
  },
  components: {
    IncNav,
    Breadcrumb,
    IncFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
