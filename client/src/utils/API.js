import axios from "axios";

export default {
    getCurrentUser: function(){
        return axios.get("/auth/user");
    }
};