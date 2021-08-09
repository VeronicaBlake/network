import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
    AppState.activePosts = AppState.activePosts.filter(p => p.id !== id)
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    AppState.posts.id = res.data
    this.getAll()
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    const res2 = await api.get(`api/profiles/${res.data.creatorId}/posts`)
    AppState.activePosts = res2.data.posts
  }
}

export const postsService = new PostsService()
