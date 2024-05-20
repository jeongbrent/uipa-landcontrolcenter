import axios from 'axios'

const baseUrl = 'http://navioncorp.asuscomm.com:58000/data'


export const getAisData = () => {
  return axios.get(baseUrl).then((response) => {
    if (response.data.length != 0) {
      const result = response.data;
      return result;
    } else {
      return response;
    }
  })
}
