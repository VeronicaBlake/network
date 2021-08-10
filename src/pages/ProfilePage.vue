<template>
  <div class="container-fluid">
    <div class="row bg-light shadow">
      <div class="col-12">
        <div>
          <div class="row">
            <div class="col-md-1">
              <img
                :src="state.activeProfile.picture"
                alt="user photo"
                height="180"
                class="rounded-circle profile-pic pr-2"
                v-if="state.activeProfile.picture"
              />
            </div>
            <div class="col-10 mt-3 ml-3">
              <h2>{{ state.activeProfile.name }}</h2>
              <i class="fas fa-user-graduate"> {{ state.activeProfile.graduated }} </i>
              <p>{{ state.activeProfile.class }}</p>
              <p>{{ state.activeProfile.bio }}</p>
            </div>
          </div>
          <div class="row ml-5">
            <img
              :src="state.activeProfile.coverImg"
              alt="user photo"
              height="180"
              class="background"
              v-if="state.activeProfile.coverImg"
            />
          </div>
          <i class="fab fa-github"> {{ state.activeProfile.github }}</i>
          <i class="fab fa-linkedin"> {{ state.activeProfile.linkedin }}</i>
          <i class="far fa-file"> {{ state.activeProfile.resume }}</i>
        </div>
      </div>
    </div>
    <div class="my-2">
      <form @submit.prevent="createPost" v-if="state.user.isAuthenticated && state.activeProfile.id === route.params.id">
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
.profile-pic {
    max-width: 10vw;
    max-height: 10vh;
    margin-right: 5%;
  }
.background{
  max-width: fill;
  max-height: 30vh
}
</style>
