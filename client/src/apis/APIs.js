import axios from 'axios';

export default  axios.create({
    baseURL: "http://100.88.184.54:8000/api/"
});