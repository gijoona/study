<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
  <a class="navbar-brand" href="index.html">Start Bootstrap</a>
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  <div class="collapse navbar-collapse" id="navbarResponsive">

    <!-- Left-Menu -->
    <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
      <left-menu v-for="menuItem of menus" :key="menuItem['@rid']" :menu-item="menuItem"></left-menu>
    </ul>
    <ul class="navbar-nav sidenav-toggler">
      <li class="nav-item">
        <a class="nav-link text-center" id="sidenavToggler">
          <font-awesome-icon icon="angle-left" />
        </a>
      </li>
    </ul>
    <!-- END Left-Menu -->

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <font-awesome-icon icon="envelope" />
          <span class="d-lg-none">Messages
                <span class="badge badge-pill badge-primary">12 New</span>
          </span>
          <span class="indicator text-primary d-none d-lg-block">
                <font-awesome-icon icon="circle"/>
              </span>
        </a>
        <div class="dropdown-menu" aria-labelledby="messagesDropdown">
          <h6 class="dropdown-header">New Messages:</h6>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                <strong>David Miller</strong>
                <span class="small float-right text-muted">11:21 AM</span>
                <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
              </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                <strong>Jane Smith</strong>
                <span class="small float-right text-muted">11:21 AM</span>
                <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
              </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                <strong>John Doe</strong>
                <span class="small float-right text-muted">11:21 AM</span>
                <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
              </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item small" href="#">View all messages</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <font-awesome-icon icon="bell" />
          <span class="d-lg-none">Alerts
                <span class="badge badge-pill badge-warning">6 New</span>
          </span>
          <span class="indicator text-warning d-none d-lg-block">
                <font-awesome-icon icon="circle"/>
              </span>
        </a>
        <div class="dropdown-menu" aria-labelledby="alertsDropdown">
          <h6 class="dropdown-header">New Alerts:</h6>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                <span class="text-success">
                  <strong>
                    <font-awesome-icon icon="long-arrow-alt-up"/>Status Update</strong>
                  </span>
                  <span class="small float-right text-muted">11:21 AM</span>
                  <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                  <span class="text-danger">
                    <strong>
                      <font-awesome-icon icon="long-arrow-alt-down"/>Status Update</strong>
                    </span>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                  </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
                    <span class="text-success">
                      <strong>
                        <font-awesome-icon icon="long-arrow-alt-up"/>Status Update</strong>
                      </span>
                      <span class="small float-right text-muted">11:21 AM</span>
                      <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item small" href="#">View all alerts</a>
        </div>
      </li>
      <li class="nav-item">
        <form class="form-inline my-2 my-lg-0 mr-lg-2">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="Search for...">
            <span class="input-group-append">
                        <button class="btn btn-primary" type="button">
                          <font-awesome-icon icon="search"/>
                        </button>
                      </span>
          </div>
        </form>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
          <font-awesome-icon icon="sign-out-alt" />Logout</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import Vue from 'vue'

var LeftMenuItem = Vue.component('leftMenu', {
  props: ['menuItem'],
  template: `
  <li class="nav-item" data-toggle="tooltip" data-placement="right" :title="menuItem.title">
    <template v-if="menuItem.isChild">
      <a class="nav-link nav-link-collapse collapsed" :href="menuItem.link" data-toggle="collapse" data-parent="#exampleAccordion">
        <font-awesome-icon v-if="menuItem.icon" :icon="menuItem.icon" />
        <span class="nav-link-text">{{ menuItem.text }}</span>
      </a>
      <ul :class="menuItem.childUlClass" :id="menuItem.childId">
        <left-menu v-for="childMenu of menuItem.child" :key="childMenu.id" :menu-item="childMenu"></left-menu>
      </ul>
    </template>
    <template v-else>
      <a class="nav-link" :href="menuItem.link" data-toggle="tooltip" data-parent="#exampleAccordion">
        <font-awesome-icon v-if="menuItem.icon" :icon="menuItem.icon" />
        <span class="nav-link-text">{{ menuItem.text }}</span>
      </a>
    </template>
  </li>
  `
})

export default {
  name: 'IncNav',
  created: function () {
    this.getMenu()
  },
  data: function() {
    return {
      menus: []
    }
  },
  components: {
    LeftMenuItem
  },
  methods: {
    getMenu: function () {
      return this.$http.get('/api/cmm/menulist').then((response) => {
        this.menus = response.data;
      })
    }
  }
}
</script>
