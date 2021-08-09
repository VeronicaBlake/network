<template>
  <div class="container-fluid">
    <div class="row bg-light shadow">
      <div class="col-12">
        <div>
        </div>
      </div>
      {{ state.account.name }}
      {{ state.account.subs }}
      {{ state.account.picture }}
      {{ state.account.bio }}
      {{ state.account.coverImg }}
      {{ state.account.class }}
      {{ state.account.graduated }}
      {{ state.account.github }}
      {{ state.account.linkedin }}
      {{ state.account.resume }}
    </div>
    <div class="my-2">
      <form @submit.prevent="createPost" v-if="state.user.isAuthenticated && state.account.id === route.params.id">
        <div class="form-group">
          <input type="text"
                 class="form-control"
                 id="body"
                 placeholder="Share your Veronica Thoughts!"
                 required
                 v-model="state.newPost.body"
          >
        </div>
        <div>
          <Post v-for="post in activePosts" :key="post.id" :post="post" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
export default {
  name: 'ProfilePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newPost: {},
      activeProfile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await profilesService.getActiveProfile(route.params.id)
        await profilesService.getProfilePosts(route.params.id)
        await accountService.getProfile(route.params.id)
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      state,
      route,
      activePosts: computed(() => AppState.activePosts),
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          Notification.toast('Successfully Created', 'success')
          state.newPost = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
