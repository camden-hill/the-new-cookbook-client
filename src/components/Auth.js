import React, {Component} from 'react';
import axios from 'axios'
import NavBar from './NavBar';
import {withRouter} from 'react-router-dom';

import '../css/styles.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
  }

  handleClick(e) {
    this.auth();
  }

  auth() {
    let username = "camden";
    let password = "test";
    let credentials = {
      "username": username,
      "password": password
    }
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      data: credentials
    }).then((response) => {
      console.log(response.data);
      this.props.history.push({
        pathname: '/favorites',
        state: {user: response.data.userId, token: response.data.id}
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <NavBar />
        <button type="submit" form="" className="submit" onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}

Auth.propTypes = {
};

export default withRouter(Auth);
