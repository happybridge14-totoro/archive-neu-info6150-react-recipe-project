import React, {memo, useReducer, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import styles from "./RatingStar.module.css";
import {ulid} from "ulid";
const STAR_NUMBER = 5;
const ACTION_HOVER = Symbol("hover");
const ACTION_LEAVE = Symbol("leave");
const ACTION_CLICK = Symbol("click");
const UPDATE_VALUE = Symbol("update");
const RatingStar = memo((props) => {
  const {score, callBack} = props;
  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case ACTION_CLICK:
        callBack(action.value);
        // falls through
      case ACTION_HOVER:
      case UPDATE_VALUE:
        return action.value;
      case ACTION_LEAVE:
        return score;
      default:
        break;
    }
  }, [score, callBack]);
  const [starScore, dispatch] = useReducer(reducer, score);
  useEffect(() => {
    dispatch({type: UPDATE_VALUE, value: score});
  },[score]);
  let stars = [];
  let tmpScore = starScore;
  for (let i = 0; i < STAR_NUMBER; i++) {
    let star = (tmpScore--) > 0 ? styles.full : styles.empty;
    stars.push(<i key={ulid()}
                  className={`${styles.star} ${star}`}
                  onClick={(e)=>{dispatch({type: ACTION_CLICK, value: i+1})}}
                  onMouseLeave={(e)=> {dispatch({type: ACTION_LEAVE})}}
                  onMouseEnter={(e)=> {dispatch({type: ACTION_HOVER, value: i+1})}}></i>);
  }
  return (<section className={styles.ratingStar}>{stars}</section>);
});

RatingStar.propTypes = {
  score: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired
};

export default RatingStar;
