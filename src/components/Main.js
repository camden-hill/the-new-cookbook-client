import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Ingredients from './ingredients/Ingredients';
import Recipes from './recipes/Recipes';
import Home from './Home';
import Admin from './Admin';
import Search from './Search';
import Auth from './Auth';
import Favorites from './Favorites';
import IngredientDetails from './ingredients/IngredientDetails';
import RecipeDetails from './recipes/RecipeDetails';
import AddIngredient from './ingredients/AddIngredient';
import AddRecipe from './recipes/AddRecipe';
import EditIngredient from './ingredients/EditIngredient';
import NotFound from './NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/admin' component={Admin} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/auth' component={Auth} />
      <Route exact path='/favorites' component={Favorites} />
      <Route exact path='/ingredients' component={Ingredients} />
      <Route exact path='/ingredients/add' component={AddIngredient} />
      <Route exact path='/ingredients/edit/:id' component={EditIngredient} />
      <Route exact path='/ingredients/:id' component={IngredientDetails} />
      <Route exact path='/recipes' component={Recipes} />
      <Route exact path='/recipes/add' component={AddRecipe} />
      <Route exact path='/recipes/:id' component={RecipeDetails} />
      <Route path='/recipes/*' component={NotFound} />
    </Switch>
  </main>
)

export default Main;
