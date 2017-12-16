import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Ingredients from './Ingredients';
import IngredientDetails from './IngredientDetails';
import AddIngredient from './AddIngredient';
import EditIngredient from './EditIngredient';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Ingredients} />
      <Route exact path='/ingredients/add' component={AddIngredient} />
      <Route exact path='/ingredients/edit/:id' component={EditIngredient} />
      <Route exact path='/ingredients/:id' component={IngredientDetails} />
    </Switch>
  </main>
)

export default Main;
