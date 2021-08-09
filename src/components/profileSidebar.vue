<template>
  <div class="row column-height bg-light shadow m-2">
    <div class="m-4">
      <button
        class="btn btn-outline-dark text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <router-link :to="{name: 'ProfilePage', params: {id:account.id}}">
        <img
          :src="user.picture"
          alt="user photo"
          height="180"
          class="rounded-circle"
          v-if="user.isAuthenticated"
        />
      </router-link>
      <h5>{{ user.name }}</h5>
      <div
        class="btn btn-outline-dark text-uppercase"
        @click="logout"
        v-if="user.isAuthenticated"
      >
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column-height {
  min-height: 100vh;
}
</style>
