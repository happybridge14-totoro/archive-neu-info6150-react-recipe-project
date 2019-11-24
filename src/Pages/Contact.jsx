import React, { Component } from "react";
import styles from './Contact.module.css';
import {getContractInfo} from '../Proxy/Data.js';
import NavigationBar from "../Widgets/NavigationBar";

const navbarPosition = [true, "contact"];
const contactInfo = getContractInfo();
const emailValidate = /^\S+@\S+\.\S+$/;

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameError: false,
      emailError: false,
      messageError: false,
      isSubmitting: false,
      isInitialStatus: true,
      nameValue: "",
      emailValue: "",
      messageValue: ""
    };
  }
  checkError = (target, value) => {
    let hasError = false;
    switch (target) {
      case "name":
      case "message":
        hasError = value === "";
        break;
      case "email":
        hasError = !this.validateEmail(value);
        break;
      default:
        break;
    }
    return hasError;
  }

  renderError = (target) => {
    let targetError = target + "Error";
    let errorString = "";
    switch (target) {
      case "name":
        errorString = "Please enter your first name.";
        break;
      case "email":
        errorString = "Please enter a valid email address: yourname@example.com";
        break;
      case "message":
        errorString = "Message field is required";
        break;
      default:
        break;
    }
    return (<p className={`${styles.errorText} + " " + ${this.state[targetError] ? "" : styles.hiddenError}`}>{errorString}</p>);
  }

  handleChange = (e) => {
    e.preventDefault();
    let target = e.target.name;
    let value = e.target.value;
    let targetKey = target + "Value";
    if (this.state[targetKey] !== value) {
      let newState = {};
      if (!this.state.isInitialStatus) {
        let targetError = target + "Error";
        newState[targetError] = this.checkError(target, value);
      }
      newState[targetKey] = value;
      this.setState(newState);
    }
  }

  validateEmail = (address) => {
    return emailValidate.test(address);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    let newState = {
      isInitialStatus: false,
      isSubmitting: true
    };
    ["name", "email", "message"].forEach((v) => {
      let targetError = v + "Error";
      let targetValue = v + "Value";
      let errorResult = this.checkError(v, this.state[targetValue]);
      newState[targetError] = errorResult;
    });
    this.setState(newState);
    //// TODO:
    // await something....
    //////////////////////
    this.setState({isSubmitting: false});
    //// TODO:
    // popup
  }

  createNodes = () => {
    let result = [];
    contactInfo.forEach((v, i) => {
      result.push(<h2 key={2*i}>{v.name}</h2>);
      result.push(<address key={2*i+1}>
        <a href={`mailto:${v.email}`} className={styles.mailto}>{v.email}</a>
      </address>);
    });
    return result;
  }

  render() {
    return (
        <div className={styles.contact}>
          <NavigationBar positions={navbarPosition}/>
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
              <form action="submit" onSubmit={this.onSubmit}>
                <div className={styles.formContainer}>
                  <label className={styles.label} htmlFor="name">Name</label>
                  <div className={this.state.nameError ? styles.error : ""}>
                    <input className={styles.input} type="text" name="name" id="name" value={this.state.nameValue} onChange={this.handleChange}/>
                  </div>
                  {this.renderError("name")}
                  <label className={styles.label} htmlFor="email">E-mail</label>
                  <div className={this.state.emailError ? styles.error : ""}>
                    <input className={styles.input} type="text" name="email" id="email" value={this.state.emailValue} onChange={this.handleChange}/>
                  </div>
                  {this.renderError("email")}
                  <label className={styles.label} htmlFor="message">Message</label>
                  <div className={this.state.messageError ? styles.error : ""}>
                    <textarea className={styles.textArea} id="message" name="message" rows="5" value={this.state.messageValue} onChange={this.handleChange}></textarea>
                  </div>
                  {this.renderError("message")}
                  <button type="submit" disabled={this.state.nameError || this.state.emailError || this.state.messageError || this.state.isSubmitting} className={`${this.state.nameError || this.state.emailError || this.state.messageError || this.state.isSubmitting ? "disabled" : ""} baseButton ${styles.submitButton}`}>Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
    )
  }
}
