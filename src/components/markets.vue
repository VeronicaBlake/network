<template>
  <div class="row column-height m-2">
    <div class="col-12" v-if="markets[0] !=null">
      <img class="img-fluid my-2" :src="markets[0].tall" alt="">
      <img class="img-fluid" :src="markets[1].tall" alt="">
    </div>
  </div>
</template>

<script>
import { marketsService } from '../services/MarketsService'
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  name: 'Markets',
  setup() {
    const state = reactive({
      markets: computed(() => AppState.markets)
    })
    onMounted(async() => {
      try {
        await marketsService.getAllMarkets()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      markets: computed(() => AppState.markets)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.column-height {
  min-height: 100vh;
}
</style>
