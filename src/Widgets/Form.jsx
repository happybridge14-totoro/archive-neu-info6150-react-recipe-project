import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = memo((props) => {
  const {dataSubmit, buttonText, items} = props.param;
  const [initStatus, setInitStatus] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let values = [];
  let setValues= [];
  let errors = [];
  let setErrors= [];
  items.forEach((v, i) => {
    [values[i], setValues[i]] = useState("");
    [errors[i], setErrors[i]] = useState(true);
  });
  const reset = useCallback(() => {
    setInitStatus(true);
    setHasError(false);
    setIsSubmitting(false);
    items.forEach((v, i) => {
      setValues[i]("");
      setErrors[i](true);
    });
  }, [items, setErrors, setIsSubmitting, setInitStatus, setValues]);
  useEffect(() => {
    if (!initStatus) {
      setHasError(errors.reduce((prev, v) => prev||v, false));
    }
  }, [initStatus, errors]);
  const handleChange = useCallback((e, i) => {
    const value = e.target.value;
    e.preventDefault();
    setErrors[i](!items[i].validator(value));
    setValues[i](value);
  }, [setErrors, setValues, items]);
  const createNodes = useCallback(() => {
    return items.map((v, i) => {
      let control;
      if (v.controlType === "input") {
        control = <input className={styles.input} type={v.type} name={v.id} id={v.id} value={values[i]} onChange={(e)=>{handleChange(e, i);}}/>
      } else if (v.controlType === "textArea") {
        control = <textarea className={styles.textArea} name={v.id} id={v.id} rows="5" value={values[i]} onChange={(e)=>{handleChange(e, i);}}/>
      }
      return (
        <div key={v.key}>
          <label className={styles.label} htmlFor={v.id}>{v.name}</label>
          <div className={errors[i] && !initStatus ? styles.error : ""}>
            {control}
          </div>
          <p className={`${styles.errorText} + " " + ${errors[i] && !initStatus ? "" : styles.hiddenError}`}>{v.errorString}</p>
        </div>
      );
      });
  }, [items, errors, initStatus, handleChange, values]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setInitStatus(false);
    const hasError = errors.reduce((prev, v) => prev||v, false);
    setHasError(hasError);
    if (!hasError) {
      setIsSubmitting(true);
      let paramObj = {};
      items.forEach((v, i) => {
        paramObj[v.id] = values[i];
      });
      let result = await dataSubmit(paramObj);
      if (result) {
        reset();
      } else {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <form action="submit" onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formContainer}>
        {createNodes()}
        <button type="submit" disabled={hasError || isSubmitting} className={`${hasError ? "disabled" : ""} baseButton reverse ${styles.submitButton}`}>{buttonText}</button>
      </div>
    </form>
  );
});

Form.propTypes = {
  param: PropTypes.exact({
    dataSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.exact({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      controlType: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      errorString: PropTypes.string.isRequired,
      validator: PropTypes.func.isRequired
    }).isRequired)
  }).isRequired
};

export default Form;
