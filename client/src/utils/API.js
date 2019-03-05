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
    getFavoriteRecipes: function(userId){
        return axios.get("/api/externalRecipes/" + userId);
    },
    getUserRecipes: function(userId){
        return axios.get("/api/recipes/" + userId);
    },
    getRecipe: function(recipeId){
        return axios.get("/api/recipes/find/" + recipeId);
    },
    updateUser: function(userId, data){
        return axios.put("/api/user/" + userId, data);
    },
    saveExternalRecipe: function(data){
        return axios.post("/api/externalRecipes", data);
    },
    postRecipe: function(userId, data){
        return axios.post("/api/recipes/" + userId, data);
    },
    deleteExternalRecipe: function(userId, recipeUri){
        return axios.delete(`/api/externalRecipes/${userId}/${recipeUri}`);
    },
    deleteUser: function(userId){
        return axios.delete("/api/user/" + userId);
    },
    deleteAllUserFavoriteRecipes: function(userId){
        return axios.delete("/api/externalRecipes/" + userId);
    },
    deleteAllUserRecipes: function(userId){
        return axios.delete("/api/recipes/" + userId);
    },
    logout: function(){
        return axios.get("/auth/logout");
    }
};