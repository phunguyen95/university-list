import React, { useEffect, useState } from "react";
import useInputState from "../hooks/useInputState";
import useDebounce from "../hooks/useDebounce";
import _isEmpty from "lodash/isEmpty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as FirestoreService from "../firestore";

import css from "./subscription-view.scss";

export default function SubscriptionView() {
  const [emailInput, updateEmailInput] = useInputState("");
  const [IsEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceEmailInput = useDebounce(emailInput, 100);
  useEffect(() => {
    if (_isEmpty(debounceEmailInput)) return;
    emailValidation();
  }, [debounceEmailInput]);
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(debounceEmailInput) === false) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
  };
  const handleSubscribe = () => {
    setIsLoading(true);
    let savedFirebaseEmail = [];

    FirestoreService.getSubscribedList().then((snapshot) => {
      snapshot.docs.map((doc) => {
        savedFirebaseEmail.push(doc.data().subscribedBy);
      });
      if (containsAny(debounceEmailInput, savedFirebaseEmail)) {
        setIsLoading(false);
        toast.warn("This email has already subscribed", {});
      } else {
        FirestoreService.createSubscribeList(debounceEmailInput).then(
          (subscribeList) => {
            setIsLoading(false);
            toast.success(
              "You have successfully subscribed to our newsletter",
              {}
            );
          }
        );
      }
    });
  };
  const containsAny = (str, substrings) => {
    for (let i = 0; i != substrings.length; i++) {
      let substring = substrings[i];
      if (str.indexOf(substring) != -1) {
        return substring;
      }
    }
    return null;
  };

  return (
    <div id="newsletter" className="bd-newsletter">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <section className="bd-index-section bd-newsletter-box">
        <div className="bd-newsletter-heading">
          <h2 className="title has-text-black mb-0 is-size-2-widescreen">
            <span className="icon has-text-primary is-size-2-widescreen smallIcon">
              {" "}
              <i className="fas fa-paper-plane"></i>{" "}
            </span>
            <strong className="heading-newsletter">Newsletter</strong>
            <br />
            <small className="subheading">
              Features, releases, showcase… stay in the loop!
            </small>{" "}
          </h2>
          <div className="bd-newsletter-fields">
            <div className="control has-icons-left is-expanded">
              <input
                type="email"
                value={emailInput}
                name="email"
                className="input is-medium is-primary"
                placeholder="email address"
                required
                onChange={updateEmailInput}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>{" "}
              </span>
              <img
                className="spam-free"
                src="https://bulma.io/images/drawing/spam-free.png"
                width="112"
                height="88"
              />
            </div>
            {IsEmailInvalid && (
              <p className="help is-danger">This email is invalid</p>
            )}
            <div className="control subscribe-button">
              {!isLoading ? (
                <button
                  onClick={handleSubscribe}
                  disabled={IsEmailInvalid}
                  className="button is-medium is-primary subscribe-button"
                >
                  <strong>Subscribe</strong>{" "}
                </button>
              ) : (
                <button className="button is-primary is-loading">Loading</button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
