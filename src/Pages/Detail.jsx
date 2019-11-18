import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: getItemById(this.props.id)
    };
  }

  render() {
    if (this.state.category === null) {
      window.location.href = '/error';
      return;
    }
    return (
      <div>hello</div>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};
