import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class EditIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      recipeId: '',
      name: '',
      quantity: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getIngredientDetails();
  }

  getIngredientDetails() {
    let ingredientId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/ingredients/${ingredientId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          recipeId: response.data.recipeId,
          name: response.data.name,
          quantity: response.data.quantity
        }, () => {
          console.log(this.state);
        });
      }).catch(err => console.log(err));
  }

  editIngredient(newIngredient) {
    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/ingredients/${this.state.id}`,
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
    this.editIngredient(newIngredient);
    e.preventDefault();
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
    return (
      <div>
        <Link to={"/"}>Back</Link>
        <h1>Edit Ingredient</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <label htmlFor="recipeId">Recipe ID</label>
            <input type="text" name="recipeId" ref="recipeId" value={this.state.recipeId} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input type="text" name="quantity" ref="quantity" value={this.state.quantity} onChange={this.handleInputChange} />
          </div>
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

EditIngredient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.string,
  })
};

export default EditIngredient;
