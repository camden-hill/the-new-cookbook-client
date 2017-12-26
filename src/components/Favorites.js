import React, {Component} from 'react';
import axios from 'axios'
import NavBar from './NavBar';

import '../css/styles.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
  }

  componentWillMount() {
    this.getRecipeDetails();
  }

  getRecipeDetails() {
    axios.defaults.headers.common['Authorization'] = this.props.location.state.token;
    axios.get(`http://localhost:3000/api/favorites`)
      .then(response => {
        let favorites = this.state.favorites;
        response.data.map((recipe) => {
          favorites = [...favorites, {
            "userId": this.props.location.state.user,
            "recipeId": recipe.recipeId
          }]
        })
        this.setState({favorites: favorites})
        console.log(this.state.favorites);
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <NavBar />
        <h3>{this.props.location.state.token}</h3>
        <h3>{this.props.location.state.user}</h3>
      </div>
    )
  }
}

Favorites.propTypes = {
};

export default Favorites;
