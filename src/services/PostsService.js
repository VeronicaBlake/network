import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getAll(url = 'api/posts') {
    const res = await api.get(url)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
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
