import axios from 'axios'

 const api = axios.create({
    baseURL:'http://localhost:8000'
})  //conexão com a api feita no django

export default api