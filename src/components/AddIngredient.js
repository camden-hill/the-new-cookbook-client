import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class AddIngredient extends Component {
  addIngredient(newIngredient) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/ingredients/',
      data: newIngredient
    }).then(() => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e) {
    const newIngredient = {
      recipeId: this.refs.recipeId.value,
      name: this.refs.name.value,
      quantity: this.refs.quantity.value
    }
    this.addIngredient(newIngredient);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Link to={"/"}>Back</Link>
        <h1>Add Ingredient</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <label htmlFor="recipeId">Recipe ID</label>
            <input type="text" name="recipeId" ref="recipeId" />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" ref="name" />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input type="text" name="quantity" ref="quantity" />
          </div>
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

AddIngredient.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  })
};


export default AddIngredient;
