import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../css/navbar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to={"/"}>Back</Link>
      </div>
    )
  }}

NavBar.propTypes = {
};


export default NavBar;
