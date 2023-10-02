import axios from 'axios'


const instance = axios.create({
    baseURL:'http://10.0.0.11:3001',
});

export default instance