<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <Post v-for="post in state.posts" :key="post.id" :post="post" />
    </div>
    <div class="row">
      <button class="btn btn-danger m-2" :disabled="!state.newer" @click="getPosts(state.newer)">
        Newer Posts
      </button>
      <button class="btn btn-info m-2" :disabled="!state.older" @click="getPosts(state.older)">
        Older Posts
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'

export default {
  name: 'Home',
  older: ' ',
  setup() {
    const state = reactive({
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),
      posts: computed(() => AppState.posts)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      async getPosts(url) {
        try {
          await postsService.getAll(url)
          state.loading = false
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
