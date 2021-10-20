import React, { useState, useEffect, useContext } from "react";
import _isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import useInputState from "../hooks/useInputState";
import useDebounce from "../hooks/useDebounce";
import { firebaseAuth } from "../provider/AuthProvider";

export default function LoginView(props) {
  const { handleSignIn, isLoading, setIsLoading, setErrors, token } =
    useContext(firebaseAuth);
  const [email, setEmail, resetEmail] = useInputState("");
  const [password, setPassword, resetPassword] = useInputState("");
  const [IsEmailInvalid, setIsEmailInvalid] = useState(false);
  const [IsPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const debounceEmailInput = useDebounce(email, 100);
  const debouncePasswordInput = useDebounce(password, 100);
  useEffect(() => {
    if (_isEmpty(debounceEmailInput)) return;
    emailValidation();
  }, [debounceEmailInput]);

  useEffect(() => {
    if (_isEmpty(debouncePasswordInput)) return;
    passwordValidation();
  }, [debouncePasswordInput]);
  useEffect(() => {
    if (!_isEmpty(token)) {
      setIsLoading(false);
      clearForm();
      setErrors([]);
      props.history.push("/");
    }
  }, [token]);

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(debounceEmailInput) === false) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
  };

  const passwordValidation = () => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (regex.test(debouncePasswordInput) === false) {
      setIsPasswordInvalid(true);
    } else {
      setIsPasswordInvalid(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //wait to signup
    await handleSignIn(debounceEmailInput, debouncePasswordInput);
  };

  const clearForm = () => {
    resetEmail("");
    resetPassword("");
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      handleSubmit(event)
    }
  }
  return (
    <div className="signup-wrapper">
      <div className="content">
        <h4>LOGIN FORM</h4>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={classnames("input", {
              "is-danger": IsEmailInvalid,
            })}
            type="email"
            placeholder="Please input your email"
            value={email}
            onChange={setEmail}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          {IsEmailInvalid && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
        </div>
        {IsEmailInvalid && (
          <p className="help is-danger">This email is invalid</p>
        )}
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            value={password}
            onChange={setPassword}
            className={classnames("input", {
              "is-danger": IsPasswordInvalid,
            })}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyDown}
            type="password"
            placeholder="Minimum eight characters, at least one letter, one number and one special character"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
        {IsPasswordInvalid && (
          <p className="help is-danger">
            Minimum eight characters, at least one letter, one number and one
            special character
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          {!isLoading ? (
            <button
              disabled={
                IsEmailInvalid ||
                IsPasswordInvalid ||
                _isEmpty(debouncePasswordInput) ||
                _isEmpty(debounceEmailInput)
              }
              onClick={handleSubmit}
 
              className="button is-link"
            >
              Login
            </button>
          ) : (
            <button disabled className="button is-link is-loading" />
          )}
        </div>
      </div>
    </div>
  );
}
