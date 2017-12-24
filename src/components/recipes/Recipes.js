import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import RecipeItem from './RecipeItem';

class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }

  componentWillMount() {
    this.getRecipes();
  }

  getRecipes() {
    axios.get('http://localhost:3000/api/recipes?filter[where][approved]=true')
      .then(response => {
        this.setState({recipes: response.data})
    })
    .catch(err => console.log(err));
  }

  render() {
    const recipeItems = this.state.recipes.map((recipe) => {
      return(
        <RecipeItem key={recipe.id} item={recipe} />
      )
    })
    return (
      <div>
        <Link to={'/recipes/add'}>Add Recipe</Link>
        <h1>Recipes</h1>
        <ul>
          {recipeItems}
        </ul>
      </div>
    )
  }
}

export default Recipes;
