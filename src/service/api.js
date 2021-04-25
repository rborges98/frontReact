import axios from 'axios'

 const api = axios.create({
    baseURL:'https://api-br-med.herokuapp.com'
})  //conexão com a api 

export default api