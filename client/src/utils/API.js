import axios from "axios";

export default {
    // API call to check current logged in user
    getCurrentUser: function(){
        return axios.get("/auth/user");
    },
    getNutritionInfo: function(query){
        return axios.get("/api/external/nutritionix/" + query);
    }
};