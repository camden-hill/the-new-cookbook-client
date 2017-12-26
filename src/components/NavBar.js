import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {withRouter} from 'react-router-dom';

import logo from '../img/icons/Logo.png';
import '../css/navbar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/search',
      search: `?query=${this.state.value}`,
      state: {query: this.state.value}
    })
  }

  render() {
    return (
      <div className="navbar">
        <Link className="homeLink" to={"/"}><img alt="logo" src={logo} /></Link>
        <FontAwesome name="search" className="icon" id="search" />
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="inputSearch" value={this.state.value} onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

export default withRouter(NavBar);
