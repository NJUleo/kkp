import request from "../utils/request"
import { get,post } from '../utils/request'

export default {
    VerifyAudience(params) {
        return request({
          url: '/VerifyAudience',
          methods: 'Get',
          params:params
        })
      },
}