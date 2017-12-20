import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../css/styles.css';

class NotFound extends Component {
  render() {
    return(
      <div>
        <Link to={"/"}>Back</Link>
        <h1 className="error">Recipe Not Found</h1>
      </div>
    )
  }
}

export default NotFound;
