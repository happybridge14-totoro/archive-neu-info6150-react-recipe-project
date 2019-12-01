import React, {memo} from 'react';
import PropTypes from 'prop-types';
import styles from "./DropDown.module.css";
import {ulid} from "ulid";

const DropDown = memo((props) => {
  return (
    <div className={styles.dropDown}>
      <a href={props.data.title.link} className={`clickable ${styles.title}`}>
        {props.data.title.name}
      </a>
      <div className={styles.contentContainer}>
        {props.data.items.map((v) => {
          return (<a key={ulid()} href={v.link} className={`clickable ${styles.item}`}>{v.name}</a>);
        })}
      </div>
    </div>
  )
});

DropDown.propTypes = {
  data: PropTypes.exact({
    title: PropTypes.exact({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

export default DropDown;
