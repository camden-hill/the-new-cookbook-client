import React, {Component} from 'react';
import NavBar from './NavBar';
import Recipes from './recipes/Recipes';

import '../css/styles.css';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Recipes />
        </div>
      </div>
    )
  }
}

export default Home;
