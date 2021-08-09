<template>
  <div class="container-fluid">
    <div class="row bg-light shadow">
      <div class="col-12">
        <div>
          <h1>{{ state.account.name }}</h1>
          <img
            :src="state.account.imgUrl"
            alt="user photo"
            height="180"
            class="rounded-circle"
            v-if="state.account.imgUrl"
          />
          <h4>{{ state.account.bio }}</h4>
          <p>{{ state.account.class }}</p>
          <p>Subscribers: {{ state.account.subs }}</p>

          {{ state.account.coverImg }}

          <i class="fas fa-user-graduate"> {{ state.account.graduated }}</i>
          <i class="fab fa-github"> {{ state.account.github }}</i>
          <i class="fab fa-linkedin"> {{ state.account.linkedin }}</i>
          <i class="far fa-file"> {{ state.account.resume }}</i>
        </div>
      </div>
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
