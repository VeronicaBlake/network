import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getActiveProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async getProfilePosts(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    AppState.activePosts = res.data.posts
  }

  async getAllProfiles() {
    const res = await api.get('api/profile/')
    AppState.activeProfile = res.data
  }
}

export const profilesService = new ProfilesService()
