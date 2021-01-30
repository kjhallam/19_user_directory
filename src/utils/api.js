import axios from 'axios';
const url = "https://randomuser.me/api/?results=100";

export default {
    searchApi: function() {
        return axios.get(url)
    }
}