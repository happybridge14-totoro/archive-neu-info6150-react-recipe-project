import React, { memo } from "react";
import styles from './Contact.module.css';
import {getContractInfo} from '../Proxy/Data';
import EVENT from "../Proxy/Event"
import NavigationBar from "../Widgets/NavigationBar";
import Form from "../Widgets/Form";
import {submitMessage} from "../Proxy/UserData";
import {ulid} from 'ulid';

const EMAIL_VALIDATOR = /^\S+@\S+\.\S+$/;
const navbarPosition = ["contact"];

const Contact = memo(() => {
  let popupPromiseResolver = null;
  let contactInfo = getContractInfo();
  const popupDismissedHandler = () => {
    if (this.popupPromiseResolver) {
      popupPromiseResolver(true);
      popupPromiseResolver = null;
    }
  };
  const onSubmit = async (values) => {
    let promise = new Promise((resolve, reject) => {
      popupPromiseResolver = resolve;
    });
    let ret = await submitMessage(values);
    if (ret) {
      window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
        "title": "Success!",
        "body": ["We have received your message.", "Thank you."],
        "buttonText": "OK",
        "callBack": popupDismissedHandler
      }}));
    } else {
      window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
        "title": "Error!",
        "body": ["Something wrong happened.", "Please try again."],
        "buttonText": "OK",
        "callBack": popupDismissedHandler
      }}));
    }
    return promise;
  };
  const formParam = {
    dataSubmit: onSubmit,
    buttonText: "Submit",
    items: [{
      "key": ulid(),
      "id": "name",
      "name": "Name",
      "controlType": "input",
      "type": "text",
      "errorString": "Please enter your name.",
      "validator": (value) => {
        return value !== "";
      }
    }, {
      "key": ulid(),
      "id": "email",
      "name": "Email",
      "controlType": "input",
      "type": "text",
      "errorString": "Please enter a valid email address: yourname@example.com.",
      "validator": (value) => {
        return EMAIL_VALIDATOR.test(value);
      }
    }, {
      "key": ulid(),
      "id": "message",
      "name": "Message",
      "controlType": "textArea",
      "type": "",
      "errorString": "Message field is required.",
      "validator": (value) => {
        return value !== "";
      }
    }]
  };
  return (
    <div className={styles.contact}>
      <NavigationBar positions={navbarPosition}/>
      <div className={styles.container}>
        <section className={styles.leftContainer}>
          <h1>Contact Us</h1>
          {contactInfo.map((v, i) => {
            return (
              <section key={ulid()}>
                <h2>{v.name}</h2>
                <address>
                  <a href={`mailto:${v.email}`} className={styles.mailto}>{v.email}</a>
                </address>
              </section>
            )
          })}
        </section>
        <section className={styles.rightontainer}>
          <h1>Leave a message</h1>
          <Form param={formParam}></Form>
        </section>
      </div>
    </div>
  );
});
export default Contact;
