import axios from 'axios'
import { apiService } from '@/services/'
import { setAuthCredentials } from '@/utils/setAuthCredentials'
import { resetAuthCredentials } from '@/utils/resetAuthCredentials'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async submitLoginForm (ctx, payload) {
    const { commit, dispatch } = ctx

    try {
      const { data } = await apiService.post('/auth', payload)

      setAuthCredentials(data)
      commit('SET_LOGGEDIN', true)

      return true
    } catch (error) {
      dispatch('showSnackbar', { color: 'error', text: 'Email ou senha inválidos.' })
      handleAjaxErrors(error.response)
      return false
    }
  },

  async submitRegisterForm (ctx, payload) {
    try {
      const result = await apiService.post('/users', payload)

      return result
    } catch (error) {
      handleAjaxErrors(error)

      return error
    }
  },

  async submitRegisterProductForm (ctx, payload) {
    try {
      const result = await apiService.post('/products', payload)

      return result
    } catch (error) {
      handleAjaxErrors(error)

      return error
    }
  },

  async editUser (ctx, payload) {
    const id = ctx.getters.userId
    try {
      await apiService.put(`/users/${id}`, payload)
    } catch (error) {
      handleAjaxErrors(error)

      return error
    }
  },

  async requestFileUploadUrl (ctx, payload) {
    const { fileType, folder } = payload
    const res = await apiService.get('services/upload', { params: { fileType, folder } })
    return res
  },

  uploadFile (ctx, payload) {
    const { url, file } = payload
    return axios.put(url, file, { headers: { 'Content-Type': file.type } })
  },

  showSnackbar (ctx, payload) {
    const { commit } = ctx
    const { text, color } = payload

    commit('SET_SNACKBAR_TEXT', text)
    commit('SET_SNACKBAR_COLOR', color)
    commit('SET_SNACKBAR', true)
  },

  logout (ctx) {
    resetAuthCredentials()
  }
}
