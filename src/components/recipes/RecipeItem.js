import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  render() {
    return (
      <li>
        <Link to={`/recipes/${this.state.item.id}`}>
          {this.state.item.name}
        </Link>
      </li>
    )
  }
}

RecipeItem.propTypes = {
  item: PropTypes.object
};

export default RecipeItem;
