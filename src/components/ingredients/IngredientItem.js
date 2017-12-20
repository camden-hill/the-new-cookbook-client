import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class IngredientItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  render() {
    return (
      <li>
        <Link to={`/ingredients/${this.state.item.id}`}>
          {this.state.item.quantity} {this.state.item.name}
        </Link>
      </li>
    )
  }
}

IngredientItem.propTypes = {
  item: PropTypes.object
};

export default IngredientItem;
