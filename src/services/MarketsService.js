import { AppState } from '../AppState'
import { api } from './AxiosService'

class MarketsService {
  async getAllMarkets() {
    const res = await api.get('api/ads')
    AppState.markets = res.data
  }
}

export const marketsService = new MarketsService()
