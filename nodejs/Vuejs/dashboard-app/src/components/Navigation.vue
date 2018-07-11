<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
  <a class="navbar-brand" href="index.html">Start Bootstrap</a>
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  <div class="collapse navbar-collapse" id="navbarResponsive">
    <!-- Left-Menu -->
    <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
      <left-menu v-for="menuItem of menus" :key="menuItem.id" :menu-item="menuItem"></left-menu>
    </ul>
    <!-- END Left-Menu -->
    <ul class="navbar-nav sidenav-toggler">
      <li class="nav-item">
        <a class="nav-link text-center" id="sidenavToggler">
          <font-awesome-icon icon="angle-left" />
        </a>
      </li>
    </ul>
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
    <a :class="menuItem.aClass" :href="menuItem.link" :data-toggle="menuItem.aToggle" data-parent="#exampleAccordion">
      <font-awesome-icon v-if="menuItem.icon" :icon="menuItem.icon" />
      <span class="nav-link-text">{{ menuItem.text }}</span>
    </a>
    <ul v-if="menuItem.isChild" :class="menuItem.childUlClass" :id="menuItem.childId">
      <left-menu v-for="childMenu of menuItem.child" :key="childMenu.id" :menu-item="childMenu"></left-menu>
    </ul>
  </li>
  `
})

export default {
  name: 'Navigation',
  data: function() {
    return {
      msg: 'navigation',
      menus: [
        {id: '0', aClass: 'nav-link', title:'Dashboard', link:'index.html', icon:'table', text:'Dashboard'},
        {id: '1', aClass: 'nav-link', title:'Charts', link:'charts.html', icon:'chart-area', text:'Charts'},
        {id: '2', aClass: 'nav-link', title:'Tables', link:'tables.html', icon:'table', text:'Tables'},
        {
          id: '3', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Components', link:'#collapseComponents', icon:'wrench', text:'Components', toggle: 'tooltip', isChild: true, childId:'collapseComponents', childUlClass: 'sidenav-second-level collapse',
          child: [
            {id: '3-1', link: 'navbar.html', text: 'Navbar'},
            {id: '3-2', link: 'cards.html', text: 'Cards'}
          ]
        },
        {
          id: '4', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Example Pages', link:'#collapseExamplePages', icon:'file', text:'Example Pages', isChild: true, childId:'collapseExamplePages', childUlClass: 'sidenav-second-level collapse',
          child: [
            {id: '4-1', link: 'login.html', text: 'Login Page'},
            {id: '4-2', link: 'register.html', text: 'Registration Page'},
            {id: '4-3', link: 'forgot-password.html', text: 'Forgot Password Page'},
            {id: '4-4', link: 'blank.html', text: 'Blank Page'}
          ]
        },
        {
          id: '5', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Menu Levels', link:'#collapseMulti', icon:'sitemap', text:'Menu Levels', isChild: true, childId:'collapseMulti', childUlClass: 'sidenav-second-level collapse',
          child: [
            {id: '5-1', link: '#', text: 'Second Level Item1'},
            {id: '5-2', link: '#', text: 'Second Level Item2'},
            {id: '5-3', link: '#', text: 'Second Level Item3'},
            {id: '5-4', aClass:"nav-link-collapse collapsed", aToggle: 'collapse', link: '#collapseMulti2', text: 'Third Level', isChild: true, childId: 'collapseMulti2', childUlClass: 'sidenav-third-level collapse',
              child: [
                {id: '5-4-1', link: '#', text: 'Third Level Item1'},
                {id: '5-4-2', link: '#', text: 'Third Level Item2'},
                {id: '5-4-3', link: '#', text: 'Third Level Item3'}
              ]
            }
          ]
        },
        {id: '6', aClass: 'nav-link', title:'Link', link:'#', icon:'link', text:'Link'}
      ]
    }
  },
  components: {
    LeftMenuItem
  }
}
</script>
