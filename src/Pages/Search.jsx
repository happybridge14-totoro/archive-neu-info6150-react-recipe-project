import {ulid} from 'ulid';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Search.module.css";
import {search, getCategoryById} from "../Proxy/Data";
import NavigationBar from "../Widgets/NavigationBar";

const navbarPosition = [true, "search"];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
    };
  }

  componentDidMount() {
    let searchReault = search(this.props.keyword);
    let renderData = searchReault.reduce((prev,v)=>{
      let tmpAry = prev[v.categoryId];
      if (!tmpAry) {
        tmpAry = prev[v.categoryId] = [];
      }
      tmpAry.push(v);
      return prev;
    }, {});
    this.setState({loading: false, data: renderData});
  }

  handleClick = (id) => {
    window.location.href = `/detail/${id}`;
  }
  handleCategoryClick = (id) => {
    window.location.href = `/category/${id}`;
  }

  renderSearchResults = () => {
    let keys = Object.keys(this.state.data);
    let result = [];
    if (keys.length === 0) {
      result.push(<div key={ulid()} className={styles.noresult}>Sorry, no results for "{this.props.keyword}".</div>);
      result.push(<div tabIndex="0" key={ulid()} className={`${styles.back} clickable`} onClick={(e)=>{e.preventDefault();window.history.back()}}>Back</div>);
    } else {
      keys.forEach((cid) => {
        result.push(<h2 className={styles.category} key={ulid()} tabIndex="0" onClick={e=>{e.preventDefault();this.handleCategoryClick(cid);}}>{getCategoryById(cid).name}</h2>);
        let items = this.state.data[cid];
        items.forEach((v) => {
          result.push(<div tabIndex="0" onClick={(e)=>{e.preventDefault();this.handleClick(v.id);}} className={styles.itemContainer} key={ulid()}>
              <img className={styles.image} src={v.imageURL} alt={v.shortName}></img>
              <div className={styles.text}>
                  <div>{v.title}</div>
                  {v.videoURL !== "" &&
                      <img className={styles.playSign} src="/images/video-icon.png" alt="video" key={ulid()}/>
                  }
              </div>
          </div>);
        });
      });
    }
    return result;
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <img src="/images/spinner.gif" alt="spinner"/>
        </div>
      );
    }
    return (
      <div className={styles.search}>
        <NavigationBar positions={navbarPosition}/>
        <section className={styles.container}>
          {this.renderSearchResults()}
        </section>
      </div>
    )
  }
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired
};
