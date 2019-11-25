import React, { Component } from "react";
import styles from './Contact.module.css';
import {getContractInfo} from '../Proxy/Data';
import EVENT from "../Proxy/Event"
import NavigationBar from "../Widgets/NavigationBar";
import Form from "../Widgets/Form";

const EMAIL_VALIDATOR = /^\S+@\S+\.\S+$/;

export default class Contact extends Component {
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

  onSubmit = async () => {
    console.log("Contact.onSubmit");
    let promise = new Promise((resolve, reject) => {
      this.popupPromiseResolver = resolve;
    });
    // let ret = await ....
    let ret = true;
    if (ret) {
      window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
        "title": "Success!",
        "body": ["We have received your message.", "Thank you."],
        "buttonText": "OK",
        "callBack": this.popupDismissedHandler
      }}));
    } else {
      window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
        "title": "Error!",
        "body": ["Something wrong happened.", "Please try again."],
        "buttonText": "OK",
        "callBack": this.popupDismissedHandler
      }}));
    }
    return promise;
  }

  popupDismissedHandler = () => {
    if (this.popupPromiseResolver) {
      this.popupPromiseResolver(true);
      this.popupPromiseResolver = null;
    }
  }

  formParam = {
    dataSubmit: this.onSubmit,
    items: [{
      "id": "name",
      "name": "Name",
      "controlType": "input",
      "type": "text",
      "errorString": "Please enter your name.",
      "validator": (value) => {
        return value !== "";
      }
    }, {
      "id": "email",
      "name": "Email",
      "controlType": "input",
      "type": "text",
      "errorString": "Please enter a valid email address: yourname@example.com.",
      "validator": (value) => {
        return EMAIL_VALIDATOR.test(value);
      }
    }, {
      "id": "message",
      "name": "Message",
      "controlType": "textArea",
      "type": "",
      "errorString": "Message field is required.",
      "validator": (value) => {
        return value !== "";
      }
    }]
  }

  render() {
    return (
        <div className={styles.contact}>
          <NavigationBar positions={this.navbarPosition}/>
          <div className={styles.container}>
            <section className={styles.leftContainer}>
              <h1>
                Contact Us
              </h1>
              {this.createNodes()}
            </section>
            <section className={styles.rightontainer}>
              <h1>
                Leave a message
              </h1>
              <Form param={this.formParam}></Form>
            </section>
          </div>
        </div>
    )
  }
}
