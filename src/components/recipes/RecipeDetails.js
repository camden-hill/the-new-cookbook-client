import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import '../../css/recipes.css';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: PropTypes.string,
      ingredients: [],
      steps: [],
      currentTimeValue: PropTypes.string,
      originalServingsCount: 1,
      servingsCount: 1,
      edit: false,
      range: 0,
      endValue: 0,
      trackerWidth: 0,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getRecipe();
    this.getRecipeIngredients();
    this.getRecipeSteps();
    this.currentTime();
  }

  componentDidUpdate() {
  }

  getRecipe() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/recipes/${recipeId}`)
      .then(response => {
        this.setState({details: response.data});
        this.setState({servingsCount: response.data.servings});
        this.setState({originalServingsCount: response.data.servings});
      })
      .catch(err => console.log(err));
  }

  getRecipeIngredients() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/ingredients?filter[where][recipeId][regexp]=${recipeId}`)
    // axios.get(`http://localhost:3000/api/ingredients`)
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(err => console.log(err));
  }

  getRecipeSteps() {
    let recipeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/steps?filter[where][recipeId][regexp]=${recipeId}`)
      .then(response => {
        this.setState({steps: response.data})
        this.calculateOffsets();
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
    })
    this.multiplyIngredientQuantities();
  }

  handleClick(e) {
    let interval;
    e.preventDefault();
    switch(e.target.id) {
      case 'edit':
        this.setState({edit: true});
        break;

      case 'reject':
        const newRejectedRecipe = {
          submittedId: this.state.details.id,
          name: this.state.details.name,
          author: this.state.details.author,
          source: this.state.details.source,
          servings: this.state.details.servings,
          submittedDate: this.state.details.createdDate,
          rejectedDate: moment()
        }

        axios.request({
          method: 'post',
          url: 'http://localhost:3000/api/rejecteds/',
          data: newRejectedRecipe
        }).catch(err => console.log(err));

        axios.delete(`http://localhost:3000/api/recipes/${this.state.details.id}`)
        .then(() => {
          this.props.history.push('/');
        }).catch(err => console.log(err));
        break;

      case 'approve':
        let approvedRecipe = this.state.details;
        approvedRecipe['approved'] = true;
        // this.approveRecipe(approvedRecipe);
        break;

      case 'start':
        this.setState({interval: setInterval(() => {
            this.setState({trackerWidth: this.state.trackerWidth+.1});
          }, 1200)
        })
        break;

      case 'stop':
        clearInterval(this.state.interval);
        break;

      case 'camera':
        console.log('camera');
        break;

      default:
        this.multiplyIngredientQuantities();
    }
  }

  approveRecipe(approvedRecipe) {
    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/recipes/${this.state.details.id}`,
      data: approvedRecipe
    }).then(() => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  currentTime() {
    setInterval(() => {
      let currentTimeValue = String(moment().format("hh:mm"));
      // let currentTimeValue = String(moment().add(5, 'minutes').format("hh:mm"));
      this.setState({currentTimeValue: currentTimeValue})
    }, 1000)
  }

  calculateOffsets() {
    let range = 0;
    let stepEnd = 0;
    this.state.steps.map((step) => {
      stepEnd = step.startTime + step.duration;
      if (stepEnd > range) {
        range = stepEnd;
      }
    })
    let roundFiveMinutes = 5 * Math.ceil(range / 5);
    this.setState({range: range});
    this.setState({endValue: String(moment().add(range, 'minutes').format("hh:mm"))});
  }

  multiplyIngredientQuantities() {
    let newIngredientQuantities = [];
    let originalQuantity = 0;
    let newQuantity = 0;
    let measures = ['cup','teaspoon','tablespoon','pinch','pound','oz','can','bottle'];

    this.state.ingredients.map(ingredient => {
      for (var i = 0; i < measures.length; i++) {
        if (ingredient.quantity.split(" ").includes(measures[i])) {
          newQuantity = ingredient.quantity.split(measures[i]);
          newQuantity = eval(newQuantity[0].split(" ")[0]) * parseInt(this.state.servingsCount) / parseInt(this.state.originalServingsCount) + ` ${measures[i]}`;
          break;
        }
      }
      newIngredientQuantities.push({
        "name": ingredient.name,
        "quantity": newQuantity,
        "createdDate": moment()
      })
    });
  }

  render() {
    let edit = <button type="submit" name="editRecipe" className="submit edit" id="edit" form="editRecipe" onClick={this.handleClick}>Edit</button>;
    let reject = <button type="submit" name="rejectRecipe" className="submit reject" id="reject" form="rejectRecipe" onClick={this.handleClick}>Reject</button>;
    let approve = <button type="submit" name="approveRecipe" className="submit" id="approve" form="approveRecipe" onClick={this.handleClick}>Approve</button>;

    let start = <button type="submit" name="start" className="submit leftButton" id="start" form="start" onClick={this.handleClick}>Start</button>
    let stop = <button type="submit" name="stop" className="submit leftButton stop" id="stop" form="stop" onClick={this.handleClick}>Stop</button>

    let head = !this.state.details.approved ? (
      <div className="stepHead">
        <form id="approveRecipe">
          {edit}
          {reject}
          {approve}
        </form>
      </div>
    ) : (
      <div>
        <div className="stepHead">
          {start}
          {stop}
        </div>
        <div className="subStepHead">
          <h6>Start cooking at {this.state.currentTimeValue}</h6>
          <h6 className="align-right">Finish cooking at {this.state.endValue}</h6>
        </div>
      </div>
    );

    let steps = !this.state.edit ? (
      <ul className="steps">
        {[].concat(this.state.steps)
          .sort((a, b) => a.startTime > b.startTime)
          .map((step, index) =>
          <li key={step.id} className="step">
            <div className="stepInfo" style={{marginLeft: 5*step.startTime+'rem', width: 5*step.duration+'rem'}}>
              <p>{step.text}</p>
              <p className="stepDuration">{String(moment().add(step.startTime, 'minutes').format("hh:mm"))} to {String(moment().add(step.startTime+step.duration, 'minutes').format("hh:mm"))}</p>
            </div>
          </li>
        )}
        <div className="tracker" style={{width: this.state.trackerWidth+'rem'}}></div>
      </ul>
    ) : (
      <ul className="steps">
        {this.state.steps.map((step) =>
          <li key={step.id} className="step editStep">
            <div className="editStepDiv"><input className="editStepInput" value={step.text} /></div>
          </li>
        )}
      </ul>
    )

    let ingredients = !this.state.edit ? (
      <ul>
        {this.state.ingredients.map((ingredient) =>
          <li key={ingredient.id}><strong>{ingredient.quantity}</strong> {ingredient.name}</li>
        )}
      </ul>
    ) : (
      <ul className="ingredients">
        {this.state.ingredients.map((ingredient) =>
          <li key={ingredient.id} className="ingredient editStep">
            <div className="editStepDiv"><input className="editStepInput" value={ingredient.name} /></div>
          </li>
        )}
      </ul>
    )

    return (
      <div onClick={this.handleClick}>
        <NavBar />
        <div className="recipe">
          <h1>{this.state.details.name}</h1>
          <div className="row">
            <h3>How many people do you want to serve?</h3>
            <input type="text" className="servingsCount" name="servingsCount" maxLength="2" placeholder={this.state.servingsCount} onChange={this.handleInputChange} />
          </div>
          <div className="container row justify-right">
            <FontAwesome name="camera" className="icon" id="camera" onClick={this.handleClick} />
          </div>
          <div className="container recipe-container">
            <div className="ingredientBox">
              <h4 className="ingredients">Ingredients</h4>
              {ingredients}
            </div>
            <div id="stepBox" className="stepBox stepDetails">
              {head}
              {steps}
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
