import React from 'react';
import PropTypes from 'prop-types';


const Video = (props) => {
    return (
      <div>
        <iframe title={props.title} width="100%" height="350px" src={props.url} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    )
}

Video.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Video;
