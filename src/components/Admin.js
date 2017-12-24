import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import RecipeItem from './recipes/RecipeItem';

import '../css/styles.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getRecipes();
  }

  getRecipes() {
    axios.get('http://localhost:3000/api/recipes?filter[where][approved]=false')
      .then(response => {
        this.setState({recipes: response.data})
    })
    .catch(err => console.log(err));
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const recipeItems = this.state.recipes.map((recipe) => {
      return(
        <RecipeItem key={recipe.id} item={recipe} />
      )
    })
    return (
      <div>
        <NavBar />
        <div className="container">
          <h2>Recipes to approve</h2>
          <ul>
            {recipeItems}
          </ul>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired
};

export default Admin;
