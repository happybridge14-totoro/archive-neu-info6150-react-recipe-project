import React from 'react';
import PropTypes from 'prop-types';


const Video = (props) => {
    return (
      <div>
        <iframe title={props.title} width="560" height="315" src={props.url} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    )
}

Video.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Video;
