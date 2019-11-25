import React, { Component } from "react";
import styles from './Form.module.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = this.getResetState();
  }
  checkError = (targetID, value) => {
    return !this.state[targetID + "Validator"](value);
  }

  handleChange = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let value = e.target.value;
    let targetKey = id + "Value";
    if (this.state[targetKey] !== value) {
      let newState = {};
      if (!this.state.isInitialStatus) {
        let targetError = id + "Error";
        newState[targetError] = this.checkError(id, value);
      }
      newState[targetKey] = value;
      this.setState(newState);
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    let newState = {
      isInitialStatus: false,
    };
    let hasError = false;
    this.props.param.items.forEach((v) => {
      let targetError = v.id + "Error";
      let targetValue = v.id + "Value";
      let errorResult = this.checkError(v.id, this.state[targetValue]);
      if (errorResult) {
        hasError = true;
      }
      newState[targetError] = errorResult;
    });
    if (!hasError) {
      newState.isSubmitting = true;
      this.setState(newState);
      let result = await this.props.param.dataSubmit();
      if (result) {
        this.reset();
      } else {
        this.setState({isSubmitting: false});
      }
    } else {
      this.setState(newState);
    }
  }

  getResetState = () => {
    let state = {
      isSubmitting: false,
      isInitialStatus: true,
    };
    this.props.param.items.forEach((v) => {
      state[v.id + "Error"] = false;
      state[v.id + "Value"] = "";
      state[v.id + "Validator"] = v.validator;
    });
    return state;
  }
  reset = () => {
    this.setState(this.getResetState());
  };

  createNodes = () => {
    let nodes = [];
    let index = 0;
    this.props.param.items.forEach((v) => {
      let errorKey = v.id + "Error";
      let valueKey = v.id + "Value";
      nodes.push(<label className={styles.label} htmlFor={v.id} key={index++}>{v.name}</label>);
      let inputControl;
      if (v.controlType === "input") {
        inputControl = <input className={styles.input} type={v.type} name={v.id} id={v.id} value={this.state[valueKey]} onChange={this.handleChange}/>
      } else if (v.controlType === "textArea") {
        inputControl = <textarea className={styles.textArea} name={v.id} id={v.id} rows="5" value={this.state[valueKey]} onChange={this.handleChange}/>
      }
      nodes.push(<div className={this.state[errorKey] ? styles.error : ""} key={index++}>
        {inputControl}
      </div>);
      nodes.push(<p className={`${styles.errorText} + " " + ${this.state[errorKey] ? "" : styles.hiddenError}`} key={index++}>{v.errorString}</p>)
    });
    return nodes;
  }

  hasError = () => {
    return this.props.param.items.some(v => {
      return this.state[v.id + "Error"];
    });
  }

  render() {
    return (
      <form action="submit" onSubmit={this.onSubmit} className={styles.form}>
        <div className={styles.formContainer}>
          {this.createNodes()}
          <button type="submit" disabled={this.hasError() || this.state.isSubmitting} className={`${this.hasError()  ? "disabled" : ""} baseButton ${styles.submitButton}`}>Submit</button>
        </div>
      </form>
    )
  }
}
