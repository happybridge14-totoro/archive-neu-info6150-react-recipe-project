import React, { Component } from "react";
import styles from './Login.module.css';
import Form from "../Widgets/Form";
import {signin} from "../Proxy/UserData";


const PAGE_SIGNIN = "signin";
const PAGE_SIGNUP = "signup";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      page: PAGE_SIGNIN
    }
  }
  onSubmit = async (values) => {
    console.log("login.onSubmit");
    return signin(values);
  }

  loginFormParam = {
    dataSubmit: this.onSubmit,
    items: [{
      "id": "username",
      "name": "User Name",
      "controlType": "input",
      "type": "text",
      "errorString": "",
      "validator": (value) => {
        return true;
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
  }

  render() {
    return (
        <div className={styles.login}>
          <div className={styles.container}>
              <Form param={this.loginFormParam}></Form>
          </div>
        </div>
    )
  }
}
