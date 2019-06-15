import request from "../utils/request"
import axios from "axios"

export default {
  VerifyAudience(data) {
    axios.post ("http://localhost:8080/VerifyAudience", data)
    // return request({
    //   url: '/VerifyAudience',
    //   methods: 'POST',
    //   data: data
    // })
  },

}