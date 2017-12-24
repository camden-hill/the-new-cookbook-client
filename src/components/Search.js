import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import NavBar from './NavBar';

import '../css/styles.css';
import '../css/search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      query: '',
      recipes: []
    }
  }

  componentWillMount() {
    this.queryRecipes();
  }

  queryRecipes() {
    const query = this.props.location.state.query;
    axios.get(`http://localhost:3000/api/ingredients?filter[where][name][regexp]=${query}`)
      .then(response => {
        let recipeIds = [];
        response.data.map((ingredient) => {
          if (!(ingredient.recipeId in recipeIds)) {
            recipeIds.push(ingredient.recipeId);
          }
        })
        return recipeIds;
      }).then((recipeIds) => {
        recipeIds.forEach((recipeId) => {
          axios.get(`http://localhost:3000/api/recipes/${recipeId}`)
          .then(response => {
            console.log(response);
            this.setState({recipes: [...this.state.recipes, response.data]})
          }).catch(err => console.log(err));
        })
        console.log(this.state.recipes);
      })
      .catch(err => console.log(err));
  }

  handleClick(e) {
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="clear">
            <h3>Search results: recipes involving "{this.props.location.state.query}"</h3>
            <ul className="searchResultItems">
              {this.state.recipes.map((recipe) =>
                <li key={recipe.id}>
                  <div class="searchResultItem">
                    <Link to={`/recipes/${recipe.id}`}>
                      <h2 className="link">{recipe.name}</h2>
                    </Link>
                    <h6>{recipe.author}</h6>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
};

export default Search;
