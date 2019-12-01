import React, { Component } from "react";
import styles from './Login.module.css';
import Form from "../Widgets/Form";
import {signIn, signUp} from "../Proxy/UserData";
import EVENT from "../Proxy/Event";
import {ulid}  from "ulid";


const PAGE_SIGNIN = "signin";
const PAGE_SIGNUP = "signup";
const VALIDATOR = (value) => {
  return value !== "";
};

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
        "key": ulid(),
        "id": "username",
        "name": "User Name",
        "controlType": "input",
        "type": "text",
        "errorString": "Please input your user name",
        "validator": VALIDATOR
      }, {
        "key": ulid(),
        "id": "pwd",
        "name": "Password",
        "controlType": "input",
        "type": "password",
        "errorString": "Please input your password",
        "validator": VALIDATOR
      }]
    };
    this.createFormParam = {
        dataSubmit: this.onCreateAccountSubmit,
        buttonText: "Create",
        items: [{
          "key": ulid(),
          "id": "username",
          "name": "User Name",
          "controlType": "input",
          "type": "text",
          "errorString": "Please input your user name",
          "validator": VALIDATOR
        }, {
          "key": ulid(),
          "id": "pwd",
          "name": "Password",
          "controlType": "input",
          "type": "password",
          "errorString": "Please input your password",
          "validator": VALIDATOR
        },{
          "key": ulid(),
          "id": "pwdcheck",
          "name": "Re-enter password",
          "controlType": "input",
          "type": "password",
          "errorString": "Please input your password",
          "validator": VALIDATOR
        },{
          "key": ulid(),
          "id": "nickname",
          "name": "Nickname",
          "controlType": "input",
          "type": "text",
          "errorString": "Please input your nickname",
          "validator": VALIDATOR
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
    if (values) {
      if (values.pwd !== values.pwdcheck) {
        this.setState({
          error: "Password not match"
        });
        return;
      }
      let ret = await signUp(values);
      if (ret.errorCode === 1) {
        this.setState({
          error: "User name already exists."
        });
      } else if (ret.errorCode === 2) {
        this.setState({
          error: "System error. Please try again later."
        });
      } else if (ret.errorCode === -1) {
        window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
              "title": "Success!",
              "body": ["You hava successfully created an account!"],
              "buttonText": "OK",
              "callBack": this.popupDismissedHandler
            }}));
      } else {
        this.setState({
          error: "Unknown error."
        });
      }
    }
  }

  handleCreateAccountClick = (e) => {
    e.preventDefault();
    this.setState({
      page: PAGE_SIGNUP
    });
  }

  popupDismissedHandler = () => {
    window.history.back();
  }

  render() {
    if (this.state.page === PAGE_SIGNUP) {
      return (
        <div className={styles.login}>
          <div key="login" className={styles.container}>
              <div className={styles.error}>{this.state.error}</div>
              <Form id="create" param={this.createFormParam}></Form>
          </div>
        </div>
      );
    } else if (this.state.page === PAGE_SIGNIN){
      return (
          <div className={styles.login}>
            <div key="signin" className={styles.container}>
              <div className={styles.error}>{this.state.error}</div>
              <Form  param={this.loginFormParam}></Form>
              <button className={`baseButton ${styles.createButton}`} onClick={this.handleCreateAccountClick}>Create an account</button>
            </div>
          </div>
      )
    }
  }
}
