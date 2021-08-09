<template>
  <div class="row">
    <div class="col-md-3 d-md-block d-none">
      <Profile />
    </div>
    <div class="col-md-6">
      <div class="row navBar d-md-block">
        <Navbar />
      </div>

      <div class="row">
        <!-- <div class="col-md-6 col-6"> -->
        <router-view />
        <!-- </div> -->
      </div>
    </div>
    <div class="col-md-3">
      <Markets />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>

  <style lang="scss">
    @import "./assets/scss/main.scss";

    .navBar{
    min-width: fill
    }
  </style>
