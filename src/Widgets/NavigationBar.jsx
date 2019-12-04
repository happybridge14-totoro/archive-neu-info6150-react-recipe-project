import React, {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import {getCategoryById, getItemById} from "../Proxy/Data";
import styles from "./NavigationBar.module.css";
import {ulid} from "ulid";

const displayLabel = (label) => {
  if (label === true) {
    return "Category";
  }
  return label.replace(/^\w/, v=>v.toUpperCase());
};
const NavigationBar = memo((props) => {
  const [secondLabel, categoryId, itemId] = props.positions;
    const renderNavbarItems = useCallback(() => {
    let ary = [];
    ary.push(<a className={`clickable ${styles.item}`} href="/" key={ulid()}>Home</a>);
    if (secondLabel) {
      ary.push(<div className={styles.sign} key={ulid()}>›</div>);
      if (categoryId && categoryId !== true) {
        ary.push(<a className={`clickable ${styles.item}`} href="/allcategories/" key={ulid()}>Category</a>);
        ary.push(<div className={styles.sign} key={ulid()}>›</div>);
        if (itemId) {
          ary.push(<a className={`clickable ${styles.item}`} href={`/category/${categoryId}`} key={ulid()}>{getCategoryById(categoryId).name}</a>);
          ary.push(<div className={styles.sign} key={ulid()}>›</div>);
          ary.push(<span className={styles.nonClickableItem} key={ulid()}>{getItemById(itemId).title}</span>);
        } else {
          ary.push(<span className={styles.nonClickableItem} key={ulid()}>{getCategoryById(categoryId).name}</span>);
        }
      } else {
        ary.push(<span className={styles.nonClickableItem} key={ulid()}>{displayLabel(secondLabel)}</span>);
      }
    }
    return ary;
  }, [secondLabel, categoryId, itemId]);
  return (
    <div className={styles.container}>
      {renderNavbarItems()}
    </div>
  );
});

NavigationBar.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired
};

export default NavigationBar;
