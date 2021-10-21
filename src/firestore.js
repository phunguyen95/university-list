import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config/firebase";
import { TOKEN_LOGIN_KEY } from "./constants/app-constant";
import { getAuth, signOut } from "firebase/auth";
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = app.firestore();
export const createSubscribeList = (email) => {
  return db.collection("subscribeList").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    subscribedBy: email,
  });
};
export const getSubscribedList = () => {
  return db.collection("subscribeList").get();
};
export const signUp = (email, password, setErrors, setToken) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const token = res.user._delegate.accessToken;
        localStorage.setItem(TOKEN_LOGIN_KEY, token);
        setToken(token);
        //grab token from local storage and set to state.
      })
      .catch((err) => {
        console.log(err.message);
        setErrors((prev) => [...prev, err.message]);
        reject();
      });
  });
};

export const signIn = (email, password, setErrors, setToken) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const token = result.user._delegate.accessToken;
        localStorage.setItem(TOKEN_LOGIN_KEY, token);
        setToken(window.localStorage.getItem(TOKEN_LOGIN_KEY));
        resolve(result);
      })
      .catch((err) => {
        console.log(err.message);
        setErrors((prev) => [...prev, err.message]);
        reject();
      });
  });
};

export const logout = (setErrors, setToken) => {
  signOut(auth)
    .then(async (res) => {
      //remove the token
      localStorage.removeItem(TOKEN_LOGIN_KEY);
      //set the token back to original state
      setToken(null);
    })
    .catch(async (err) => {
      //there shouldn't every be an error from firebase but just in case
      await setErrors((prev) => [...prev, err]);
      //whether firebase does the trick or not i want my user to do there thing.
      localStorage.removeItem(TOKEN_LOGIN_KEY);
      setToken(null);
    });
};
