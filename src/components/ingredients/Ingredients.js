import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import IngredientItem from './IngredientItem';

class Ingredients extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: []
    }
  }

  componentWillMount() {
    this.getIngredients();
  }

  getIngredients() {
    axios.get('http://localhost:3000/api/ingredients')
      .then(response => {
        this.setState({ingredients: response.data}, () => {
          console.log(response.data)
        })
    })
    .catch(err => console.log(err));
  }

  render() {
    const ingredientItems = this.state.ingredients.map((ingredient) => {
      return(
        <IngredientItem key={ingredient.id} item={ingredient} />
      )
    })
    return (
      <div>
        <Link to={'/ingredients/add'}>Add Ingredient</Link>
        <h1>Ingredients</h1>
        <ul>
          {ingredientItems}
        </ul>
      </div>
    )
  }
}

export default Ingredients;
