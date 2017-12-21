import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../css/navbar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to={"/"}>Back</Link>
      </div>
    )
  }}

export default NavBar;
