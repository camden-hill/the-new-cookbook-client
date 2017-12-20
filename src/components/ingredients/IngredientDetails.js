import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class IngredientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: PropTypes.string
    }
  }

  componentWillMount() {
    this.getIngredient();
  }

  getIngredient() {
    let ingredientId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/ingredients/${ingredientId}`)
      .then(response => {
        this.setState({details: response.data}, () => {
          console.log(this.state);
        })
    })
    .catch(err => console.log(err));
  }

  onDelete() {
    let ingredientId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/ingredients/${ingredientId}`)
    .then(() => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Link to={"/"}>Back</Link>
        <h1>{this.state.details.name}</h1>
        <Link to={`/ingredients/edit/${this.state.details.id}`}>Edit</Link>
        <button onClick={this.onDelete.bind(this)}>Delete</button>
      </div>
    )
  }
}

IngredientDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.string,
  }).isRequired
};

export default IngredientDetails;
