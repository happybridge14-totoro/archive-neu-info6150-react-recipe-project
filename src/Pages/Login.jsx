import React, { Component } from "react";
import styles from './Login.module.css';
import Form from "../Widgets/Form";
import {signIn} from "../Proxy/UserData";


const PAGE_SIGNIN = "signin";
const PAGE_SIGNUP = "signup";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      page: PAGE_SIGNIN,
      error: ""
    };
    this.loginFormParam = {
      dataSubmit: this.onLoginSubmit,
      buttonText: "Sign in",
      items: [{
        "id": "username",
        "name": "User Name",
        "controlType": "input",
        "type": "text",
        "errorString": "Please input your user name",
        "validator": (value) => {
          return value !== "";
        }
      }, {
        "id": "pwd",
        "name": "Password",
        "controlType": "input",
        "type": "password",
        "errorString": "Please input your password",
        "validator": (value) => {
          return value !== "";
        }
      }]
    };
    this.createFormParam = {
        dataSubmit: this.onCreateAccountSubmit,
        buttonText: "Sign in",
        items: [{
          "id": "username",
          "name": "User Name",
          "controlType": "input",
          "type": "text",
          "errorString": "Please input your user name",
          "validator": (value) => {
            return value !== "";
          }
        }, {
          "id": "pwd",
          "name": "Password",
          "controlType": "input",
          "type": "password",
          "errorString": "",
          "validator": (value) => {
            return true;
          }
        }]
      };
  }
  onLoginSubmit = async (values) => {
    let ret = await signIn(values.username, values.pwd);
    if (ret) {
      if (window.history.length > 0) {
        window.history.back();
      } else {
        window.location.replace("/");
      }
    } else {
      this.setState({
        error: "User name or password error."
      });
    }
  }
  onCreateAccountSubmit = async (values) => {
    console.log("onCreateAccountSubmit.onSubmit");
    console.log(values);
    let ret = await signIn(values);
    console.log(ret);
    return ret;
    // return signin(values);
  }

  handleCreateAccountClick = (e) => {
    e.preventDefault();
    this.setState({
      page: PAGE_SIGNUP
    });
  }

  render() {
    if (this.state.page === PAGE_SIGNUP) {
      return (
        <div className={styles.login}>
          <div className={styles.container}>
              <Form param={this.createFormParam}></Form>
          </div>
        </div>
      );
    } else if (this.state.page === PAGE_SIGNIN){
      return (
          <div className={styles.login}>
            <div className={styles.container}>
              <div className={styles.error}>{this.state.error}</div>
              <Form param={this.loginFormParam}></Form>
              <button className={`baseButton ${styles.createButton}`} onClick={this.handleCreateAccountClick}>Create an account</button>
            </div>
          </div>
      )
    }
  }
}
