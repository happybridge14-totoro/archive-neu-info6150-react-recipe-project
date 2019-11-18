import React, { Component } from "react";
import  { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import {getCategoryById} from "../Proxy/Data";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: getCategoryById(this.props.id)
    };
  }

  render() {
    if (this.state.category === null) {
      return <Redirect to='/error'/>
    }
    return (
      <div>hello</div>
    )
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};
