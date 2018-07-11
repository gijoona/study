<template>
  <div class="col-xl-3 col-sm-6 mb-3">
    <div :class="[cardClass, bgClass]">
      <div class="card-body">
        <div class="card-body-icon">
          <font-awesome-icon icon="comments" />
        </div>
        <div class="mr-5">{{ iconCard.title }}</div>
      </div>
      <a class="card-footer text-white clearfix small z-1" href="#">
        <span class="float-left">View Details</span>
        <span class="float-right">
          <font-awesome-icon icon="angle-right"/>
        </span>
      </a>
    </div>
  </div>

  <!--
  <div class="row">
    <div class="col-xl-3 col-sm-6 mb-3">
      <div class="card text-white bg-primary o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <font-awesome-icon icon="comments"/>
          </div>
          <div class="mr-5">26 New Messages!</div>
        </div>
        <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                    <span class="float-right">
                      <font-awesome-icon icon="angle-right"/>
                    </span>
                  </a>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 mb-3">
      <div class="card text-white bg-warning o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <font-awesome-icon icon="list"/>
          </div>
          <div class="mr-5">11 New Tasks!</div>
        </div>
        <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                    <span class="float-right">
                      <font-awesome-icon icon="angle-right"/>
                    </span>
                  </a>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 mb-3">
      <div class="card text-white bg-success o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <font-awesome-icon icon="shopping-cart"/>
          </div>
          <div class="mr-5">123 New Orders!</div>
        </div>
        <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                    <span class="float-right">
                      <font-awesome-icon icon="angle-right"/>
                    </span>
                  </a>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 mb-3">
      <div class="card text-white bg-danger o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
          </div>
          <div class="mr-5">13 New Tickets!</div>
        </div>
        <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                    <span class="float-right">
                      <font-awesome-icon icon="angle-right"/>
                    </span>
                  </a>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'IconCard',
  props: ['iconCard'],
  data: function() {
    return {
      cardClass: 'card text-white o-hidden h-100',
      bgClass: 'bg-' + this.iconCard.type
    }
  }
}
</script>
