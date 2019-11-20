import React from 'react';
import PropTypes from 'prop-types';
import styles from "./DropDown.module.css";


const DropDown = (props) => {
  let index = 0;
  const linkAry = props.data.items.map((v) => {
    return (<a key={index++} href={v.link} className={`clickable ${styles.item}`}>{v.name}</a>);
  });
  return (
    <div className={styles.dropDown}>
      <a href={props.data.title.link} className={`clickable ${styles.title}`}>
        {props.data.title.name}
      </a>
      <div className={styles.contentContainer}>
        {linkAry}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DropDown
