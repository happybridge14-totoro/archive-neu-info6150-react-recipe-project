import React, { Component } from "react";
import styles from './Login.module.css';
import Form from "../Widgets/Form";
import {signin} from "../Proxy/UserData";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.navbarPosition = [true, "contact"];
    this.contactInfo = getContractInfo();
    this.popupPromiseResolver = null;
  }
  createNodes = () => {
    let result = [];
    this.contactInfo.forEach((v, i) => {
      result.push(<h2 key={2*i}>{v.name}</h2>);
      result.push(<address key={2*i+1}>
        <a href={`mailto:${v.email}`} className={styles.mailto}>{v.email}</a>
      </address>);
    });
    return result;
  }

  onSubmit = async (values) => {
    console.log("login.onSubmit");
    return signin(values);
  }

  popupDismissedHandler = () => {
    if (this.popupPromiseResolver) {
      this.popupPromiseResolver(true);
      this.popupPromiseResolver = null;
    }
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
              <Form param={this.formParam}></Form>
          </div>
        </div>
    )
  }
}
