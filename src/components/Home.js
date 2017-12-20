import React, {Component} from 'react';
import NavBar from './NavBar';
import Ingredients from './ingredients/Ingredients';
import Recipes from './recipes/Recipes';

import '../css/styles.css';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Ingredients />
          <Recipes />
        </div>
      </div>
    )
  }
}

export default Home;
