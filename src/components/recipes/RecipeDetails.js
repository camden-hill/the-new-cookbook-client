import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';

import '../../css/recipes.css';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: PropTypes.string,
      ingredients: [],
      steps: [],
      currentTimeValue: PropTypes.string,
      servingsCount: 1
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getRecipe();
    this.getRecipeIngredients();
    this.getRecipeSteps();
    this.currentTime();
  }

  getRecipe() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/recipes/${recipeId}`)
      .then(response => {
        this.setState({details: response.data}, () => {
          console.log(this.state);
        });
        this.setState({servingsCount: response.data.servings});
      })
      .catch(err => console.log(err));
  }

  getRecipeIngredients() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/ingredients?filter[where][recipeId][like]=${recipeId}`)
      .then(response => {
        this.setState({ingredients: response.data}, () => {
          if (this.state.ingredients.length) {
            this.state.ingredients.map((ingredient) =>
              console.log(ingredient.name)
            )
          }
        })
    })
    .catch(err => console.log(err));
  }

  getRecipeSteps() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/steps?filter[where][recipeId][like]=${recipeId}`)
      .then(response => {
        this.setState({steps: response.data}, () => {
          if (this.state.steps.length) {
            this.state.steps.map((step) =>
              console.log(step.text)
            )
          }
        })
    })
    .catch(err => console.log(err));
  }

  onDelete() {
    let recipeId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/recipes/${recipeId}`)
    .then(() => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  currentTime() {
    setInterval(() => {
      let date = new Date();
      let hours = date.getHours()>12 ? date.getHours()-12 : date.getHours();
      hours = hours===0 ? 12 : hours;
      const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes();
      const currentTimeValue = `${hours}:${minutes}`;
      this.setState({currentTimeValue: currentTimeValue})
    }, 1000)
  }

  render() {
    return (
      <div>
        <NavBar />
        <Link to={'/recipes/add'}>Add Recipe</Link>
        <div className="recipe">
          <h1>{this.state.details.name}</h1>
          <div className="row">
            <h3>How many people do you want to serve?</h3>
            <input type="text" className="servingsCount" name="servingsCount" placeholder={this.state.servingsCount} onChange={this.handleInputChange} />
          </div>
          <div className="recipe-container">
            <div className="ingredientBox">
              <h4>Ingredients</h4>
              <ul>
                {this.state.ingredients.map((ingredient) =>
                  <li key={ingredient.id}><strong>{ingredient.quantity}</strong> {ingredient.name}</li>
                )}
              </ul>
            </div>
            <div className="stepBox stepDetails">
              <div className="stepHead">
                <h6>Start cooking at <span className="underline">{this.state.currentTimeValue}</span></h6>
              </div>
              <ul className="steps">
                {this.state.steps.map((step) =>
                  <li key={step.id} className="step">
                    <div className="stepText">{step.text}</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired
};

export default RecipeDetails;
