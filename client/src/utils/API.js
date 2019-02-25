import axios from "axios";

export default {
    // API call to check current logged in user
    getCurrentUser: function(){
        return axios.get("/auth/user");
    },
    getNutritionInfo: function(query){
        return axios.get("/api/external/nutritionix/" + query);
    },
    getEdamamRecipes: function(query){
        return axios.get("/api/external/edamam/" + query);
    },
    getRandomRecipes: function(){
        return axios.get("/api/external/edamam/random");
    },
    updateUser: function(id, data){
        return axios.put("/api/user/" + id, data);
    },
    saveExternalRecipe: function(data){
        return axios.post("/api/externalRecipes", data);
    },
    deleteExternalRecipe: function(userId, recipeUri){
        return axios.delete(`/api/externalRecipes/${userId}/${recipeUri}`);
    }
};