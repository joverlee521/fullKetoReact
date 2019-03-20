# Full Keto
[Full Keto](https://fullketo.herokuapp.com) is a full stack application dedicated to the Ketogenic lifestyle. It allows users to search food items to get nutrition info and search ingredients to find related Ketogenic recipes. If users are signed in, they can save recipes and also upload their own recipes. 

![Full Keto](https://user-images.githubusercontent.com/40774762/53906351-90cbda80-3fff-11e9-9df4-163e83924039.png)


## Deployment
The application is deployed to Heroku: https://fullketo.herokuapp.com

* There may be a small delay when you first try to access the application due to the web dyno going to sleep if it receives no traffic for 30 minutes

## Walkthrough
### Is it Keto?
* Search any food item to see the net carbs per serving and whether or not it's considered keto

![It is Keto!](https://user-images.githubusercontent.com/40774762/53906667-5dd61680-4000-11e9-82bd-de417b772ea3.png)

![It is NOT Keto!](https://user-images.githubusercontent.com/40774762/53906903-e5238a00-4000-11e9-9e08-e3b6990f2552.png)

### Recipes
* Search an ingredient to find related Keto recipes
* Click the "Get Random Recipes" button to get 36 random Keto recipes

![Search Recipes](https://user-images.githubusercontent.com/40774762/53907064-3df32280-4001-11e9-88c5-736af9beefb5.png)

* Click on the recipe title to reveal the nutrition facts

<p align="center">
  <img src="https://user-images.githubusercontent.com/40774762/53907414-fd47d900-4001-11e9-8e7d-d7cdbd01b8ed.png" alt="recipe nutrition facts"/>
</p>

* Click on the link at the bottom of the recipe to open the recipe page in a new tab
* If the user is signed in, they can save a recipe by clicking on the heart icon at the top right corner of the recipe

### User Dashboard
* Sign in with Google to see the user dashboard

![User Dashboard](https://user-images.githubusercontent.com/40774762/53907856-eb1a6a80-4002-11e9-89b1-bb0e5c816388.png)

* Users can edit their username or delete their account via the Account tab

![Account Tab](https://user-images.githubusercontent.com/40774762/53908015-4c423e00-4003-11e9-9e51-b071aab2a511.png)

* The Favorites tab shows the user's saved recipes
* Users can remove the recipe from their favorites list by clicking on the heart icon

![Favorites Tab](https://user-images.githubusercontent.com/40774762/53908285-ddb1b000-4003-11e9-9876-1f121f899710.png)

* My Recipes shows the user's uploaded recipes and allows the user to add new recipes

![My Recipes Tab](https://user-images.githubusercontent.com/40774762/53908442-2ff2d100-4004-11e9-946a-e5d8bf88d8b0.png)

### Add a Recipe
* Clicking the "Add a Recipe" button will direct users to the Add Recipe form
* The Add Recipe form is split into 3 sections:
  
  * The top section is used to fill in general information about the recipe: 
  
![Add Recipe Form: Top Section](https://user-images.githubusercontent.com/40774762/54723098-abd03b80-4b23-11e9-9fa5-1ac7132b6f8d.png)

  * The Ingredients section allows users to dynamically add ingredients to the recipe:
    * Clicking the "Add Another Ingredient" button will render another input group to add another ingredient
    * Clicking the "X" in the upper right hand corner will delete the ingredient from the list
  
![Add Recipe Form: Ingredients Section](https://user-images.githubusercontent.com/40774762/54723523-0d44da00-4b25-11e9-95c2-2682264dbc46.png)

  * The Instructions section also allows users to dynamically add instructions to the recipe:
  
![Add Recipe Form: Instructions Section](https://user-images.githubusercontent.com/40774762/54723630-6280eb80-4b25-11e9-8cdd-d19689c2e21c.png)

## Future Features
### Meal Planner
* Allow signed in users to plan out a week's meal in a calendar
* Allow them to search external or internal recipes 
* Drag and drop recipe cards on to the meal planner calendar
* Automatically calculate the daily net carbs based on the recipes added

## Technologies Used
* React
* Material-UI
* Node and Express
* MySQL/Sequelize
* [Passport](http://www.passportjs.org/)
* [EDAMAM API](https://developer.edamam.com/)
* [Nutritionix API](https://www.nutritionix.com/)
