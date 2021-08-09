<template>
  <div class="container-fluid" v-if="post != null">
    <div class="row bg-light my-2 shadow">
      <div class="col-6 post-card p-2">
        <div class="row">
          <router-link :to="{name: 'ProfilePage', params: {id:post.creator.id}}">
            <img class="rounded-circle profile-pic" :src="post.creator.picture" alt="">{{ post.creator.name }}
          </router-link>
        </div>
        <div class="row">
          <span class=" col text-left mx-4 " v-if="post.creator"> Created at: {{ post.createdAt }}
          </span>
          <button v-if="state.account && state.account.id == post.creatorId" class="btn btn-danger" @click="deletePost">
            Delete
          </button>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <h6 class="body-text">
            <span>{{ post.body }}</span>
          </h6>
        </div>
        <div class="row">
          <img class="meme" v-if="post.imgUrl" :src="post.imgUrl">
        </div>
        <div class="row">
          <h3>
            <i class="fas fa-heart text-danger" @click="like"></i> {{ post.likes.length }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id)
          Notification.toast('Deleted', 'success')
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async like() {
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .meme {
    max-height: 20vh;
    max-width: 20vw
  }

  .profile-pic {
    max-width: 10vw;
    max-height: 10vh;
    margin-right: 5%;
  }

  .body-text{
      color: darkslategrey
  }

  .post-card {
    height: 13rem
  }
</style>
