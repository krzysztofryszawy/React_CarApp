import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-car.firebaseio.com/'
})

export default instance;