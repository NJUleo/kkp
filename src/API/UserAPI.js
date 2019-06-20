
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
  },
  GetScheduleListByMovieId: (params) => {
    return request({
      url: '/GetScheduleListByMovieId',
      method: 'get',
      params
    })
  },
  GetHallList: () => {
    return request({
      url: 'GetHallList',
      method: 'get'
    })
  },
  GetSeatListByScheduleId: (params) => {
    return request({
      url: '/GetSeatListByScheduleId',
      method: 'get',
      params
    })
  },
  BuyTicket: (data) => {
    return request({
      url: 'BuyTicket',
      method: 'post',
      data
    })
  },
  CancelOrder: (orderId) => {
    return request({
      url: 'CancelOrder',
      method: 'get',
      params: { orderId }
    })
  },
  PayOrder: (orderId) => {
    return request({
      url: 'PayOrder',
      method: 'get',
      params: { orderId }
    })
  },
  GetUserVipCard: (userId) => {
    return request({
      url: 'GetUserVipCard',
      method: 'get',
      params: { userId }
    })
  },
  InsertUserVipCard: (userId) => {
    return request({
      url: 'InsertUserVipCard',
      method: 'post',
      data: {
        userId
      }
    })
  }
}

export default api