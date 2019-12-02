import React, {useState, memo} from "react";
import styles from './Login.module.css';
import Form from "../Widgets/Form";
import {signIn, signUp} from "../Proxy/UserData";
import EVENT from "../Proxy/Event";
import {ulid}  from "ulid";

const PAGE_SIGNIN = Symbol("signin");
const PAGE_SIGNUP = Symbol("signup");
const VALIDATOR = value => value !== "";
const Login = memo((props) => {
  const [page, setPage] = useState(PAGE_SIGNIN);
  const [error, setError] = useState("");
  const onLoginSubmit = async (values) => {
    let ret = await signIn(values.username, values.pwd);
    if (ret) {
      if (window.history.length > 0) {
        window.history.back();
      } else {
        window.location.replace("/");
      }
    } else {
      setError("User name or password error.");
    }
  };
  const onCreateAccountSubmit = async (values) => {
    if (values) {
      if (values.pwd !== values.pwdcheck) {
        setError("Password not match");
        return;
      }
      let ret = await signUp(values);
      if (ret.errorCode === 1) {
        setError("User name already exists");
      } else if (ret.errorCode === 2) {
        setError("System error. Please try again later");
      } else if (ret.errorCode === -1) {
        window.dispatchEvent(new CustomEvent(EVENT.DISPLAY_POPUP, {detail:{
          "title": "Success!",
          "body": ["You hava successfully created an account!"],
          "buttonText": "OK",
          "callBack": () => window.history.back()
        }}));
      } else {
        setError("Unknown error");
      }
    }
  };
  const loginFormParam = {
    dataSubmit: onLoginSubmit,
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
  const createFormParam = {
    dataSubmit: onCreateAccountSubmit,
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
  if (page === PAGE_SIGNUP) {
    return (
        <div className={styles.login}>
          <div key="login" className={styles.container}>
              <div className={styles.error}>{error}</div>
              <Form param={createFormParam}></Form>
              <div className={styles.label}>Already have an account?</div>
              <button className={`baseButton ${styles.anotherButton}`} onClick={(e) => {setPage(PAGE_SIGNIN)}}>Sign in</button>
          </div>
        </div>
      );
  } else if (page === PAGE_SIGNIN){
    return (
        <div className={styles.login}>
          <div key="signin" className={styles.container}>
            <div className={styles.error}>{error}</div>
            <Form param={loginFormParam}></Form>
            <div className={styles.label}>Don't have an account?</div>
            <button className={`baseButton ${styles.anotherButton}`} onClick={(e) => {setPage(PAGE_SIGNUP)}}>Create an account</button>
          </div>
        </div>
      )
    }
});
export default Login;
