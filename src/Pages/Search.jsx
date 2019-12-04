import {ulid} from 'ulid';
import React, {useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import styles from "./Search.module.css";
import {search, getCategoryById} from "../Proxy/Data";
import NavigationBar from "../Widgets/NavigationBar";

const navbarPosition = ["search"];
const Search = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderData, setRenderData] = useState({});
  useEffect(() =>{
    setIsLoading(true);
    const result = search(props.keyword).reduce((prev,v)=>{
      let tmpAry = prev[v.categoryId];
      if (!tmpAry) {
        tmpAry = prev[v.categoryId] = [];
      }
      tmpAry.push(v);
      return prev;
    }, {});
    setRenderData(result);
    setIsLoading(false);
  },[props.keyword]);
  const handleClick = useCallback((e, id, isCategory) => {
    e.preventDefault();
    window.location = `/${isCategory ? "category" : "detail"}/${id}`;
  }, []);
  const renderSearchResults = useCallback(() => {
    const keys = Object.keys(renderData);
    if (keys.length === 0) {
      return (
        <section className={styles.container}>
          <div className={styles.noresult}>Sorry, no results for "{props.keyword}".</div>
          <div tabIndex="0" className={`${styles.back} clickable`} onKeyPress={(e)=>{e.key === 'Enter' && window.history.back();}} onClick={(e)=>{e.preventDefault();window.history.back()}}>Back</div>
        </section>
      );
    } else {
      return keys.map((cid) => {
        const items = renderData[cid].map((v) => {
          return (
            <div tabIndex="0" onKeyPress={(e)=>{e.key === 'Enter' && handleClick(e, v.id, false);}} onClick={(e)=>{handleClick(e, v.id, false)}} className={styles.itemContainer} key={ulid()}>
              <img className={styles.image} src={v.imageURL} alt={v.shortName}></img>
              <div className={styles.text}>
                <div>{v.title}</div>
                {v.videoURL !== "" &&
                    <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
                }
              </div>
            </div>
          );
        });
        return (
          <section key={ulid()} className={styles.container}>
            <h2 className={styles.category} tabIndex="0" onKeyPress={(e) => {e.key === 'Enter' && handleClick(e, cid, true)}} onClick={e=>{handleClick(e, cid, true)}}>{getCategoryById(cid).name}</h2>
            {items}
          </section>
      )});
    }
  }, [props.keyword, handleClick, renderData]);
  if (isLoading) {
    return (
        <div>
          <img src="/images/spinner.gif" alt="spinner"/>
        </div>
      );
  } else {
    return (
      <div className={styles.search}>
        <NavigationBar positions={navbarPosition}/>
        {renderSearchResults()}
      </div>
    );
  }
};

Search.propTypes = {
  keyword: PropTypes.string.isRequired
};
export default Search;
