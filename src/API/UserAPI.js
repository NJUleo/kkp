
import axios from "axios"

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000
})

const api = {
  VerifyAudience: (data) => {
    return request({
      url: '/VerifyAudience',
      method: 'post',
      data
    })
  },
  RegisterAudience: (data) => {
    return request({
      url: '/InsertAudience',
      method: 'post',
      data
    })
  },
  GetMovieList: () => {
    return request({
      url: '/GetMovieList',
      method: 'get'
    })
  },
  GetLikeMarkListByUserId: (params) => {
    return request({
      url: '/GetLikeMarkListByUserId',
      method: 'get',
      params
    })
  },
  InsertLikeMark: (data) => {
    return request({
      url: '/InsertLikeMark',
      method: 'post',
      data
    })
  },
  DeleteLikeMarkByUserIdAndMovieId: (params) => {
    return request({
      url: '/DeleteLikeMarkByUserIdAndMovieId',
      method: 'get',
      params
    })
  }
}

export default api