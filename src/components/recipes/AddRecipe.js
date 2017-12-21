import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import '../../css/styles.css';
import '../../css/recipes.css';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      newIngredientText: PropTypes.string,
      newStepText: PropTypes.string,
      ingredients: [
      ],
      steps: [
      ]
    }
  }

  componentWillMount() {
  }

  addIngredient(newIngredient) {
    let ingredients = this.state.ingredients;
    ingredients = [...ingredients, {
      "name": newIngredient,
      "quantity": "9"
    }];
    this.setState({ingredients: ingredients}, () => {
      this.refs.newIngredientText.value="";
    })
  }

  addStep(newStep) {
    let steps = this.state.steps;
    const currentTime = moment().format()
    console.log(currentTime);
    steps = [...steps, {
      "text": newStep,
      "startTime": currentTime,
      "duration": 10
    }];
    this.setState({steps: steps}, () => {
      this.refs.newStepText.value="";
    })
  }

  addRecipe(newRecipe) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/recipes/',
      data: newRecipe
    }).then((response) => {
      let recipeId = response.data.id;
      this.state.ingredients.forEach((ingredient) => {
        axios.request({
          method: 'post',
          url: 'http://localhost:3000/api/ingredients/',
          data: {
            "recipeId": response.data.id,
            "name": ingredient.name,
            "quantity": ingredient.quantity
          }
        }).catch(err => console.log(err));
      })
      return recipeId;
    }).then((recipeId) => {
      console.log(recipeId);
      this.state.steps.forEach((step) => {
        axios.request({
          method: 'post',
          url: 'http://localhost:3000/api/steps/',
          data: {
            "recipeId": recipeId,
            "text": step.text,
            "startTime": step.startTime,
            "duration": step.duration
          }
        }).catch(err => console.log(err));
      })
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  handleClick(e) {
    switch (e.target.id) {
      case 'addIngredient':
        console.log('Add Ingredient');
        this.addIngredient(this.state.newIngredientText);
        break;
      case 'addStep':
        console.log('Add Step');
        this.addStep(this.state.newStepText);
        break;
      default:
        console.log('Other');
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newRecipe = {
      name: this.refs.name.value,
      author: this.refs.author.value,
      source: this.refs.source.value,
      servings: this.refs.servingsCount.value
    }
    this.addRecipe(newRecipe);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="recipe">
          <div className="row">
            <h5>Add Recipe</h5>
          </div>
          <div className="row">
            <input className="h1Input" type="text" name="name" ref="name" placeholder="Recipe Name" />
          </div>
          <div className="row">
            <input type="text" className="stdInput" name="author" ref="author" placeholder="Author" />
          </div>
          <div className="row">
            <input type="text" className="stdInput" name="source" ref="source" placeholder="Source" />
          </div>
          <div className="row">
            <h3>How many people does this recipe serve?</h3>
            <input type="text" className="servingsCount" id="servingsCount" name="servingsCount" ref="servingsCount" onChange={this.handleInputChange} />
          </div>
          <div className="recipe-container">
            <div className="ingredientBox">
              <h4>Ingredients</h4>
              <ul>
                {this.state.ingredients.map((ingredient, index) =>
                  <li key={index} className="ingredient">
                    {ingredient.name}
                  </li>
                )}
                <li><input className="newIngredient" type="text" name="newIngredientText" id="newIngredientText" ref="newIngredientText" placeholder="Add Ingredient" onChange={this.handleInputChange} /></li>
                <FontAwesome name="plus-circle" className="icon plusCircle" id="addIngredient" onClick={this.handleClick} />
              </ul>
            </div>
            <div className="stepBox">
              <div className="steps">
                <ul className="stepsText">
                  {this.state.steps.map((step, index) =>
                    <li key={index} className="step">
                      <div className="stepText">{step.text}</div>
                    </li>
                  )}
                  <li className="row-basic"><input className="newStep" type="text" name="newStepText" id="newStepText" ref="newStepText" placeholder="Add Step" onChange={this.handleInputChange} /><FontAwesome name="plus-circle" className="icon plusCircle" id="addStep" onClick={this.handleClick} /></li>
                </ul>
              </div>
              <div className="stepFooter">
                <button type="submit" form="addRecipe" className="submitRecipe submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

AddRecipe.propTypes = {
};

export default AddRecipe;
