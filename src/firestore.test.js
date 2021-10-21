import React from "react";
import firebase from "@firebase/app-compat";
import {
  signUp,
  logout,
  signIn,
  createSubscribeList,
  getSubscribedList,
} from "./firestore";
import { firebaseConfig } from "./config/firebase";
const {
  mockCollection,
  mockAdd,
} = require("firestore-jest-mock/mocks/firestore");

describe("firebase unit test suite", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    firebase.initializeApp(firebaseConfig);
  });
  beforeEach(async () => {
    await logout();
  });
  test("signInWithEmailpassword with invalid credential", async () => {
    const error = ["error"];
    const setHookError = jest.fn().mockImplementation(() => ["error"]);
    const setToken = jest.fn();
    try {
      await signIn("unit-test@gmail.com", "1", setHookError, setToken);
    } catch (err) {
      error = err.toString();
      console.log("error", error);
    }
  });
  test("signInWithEmailpassword with correct credential", async () => {
    const setHookError = jest.fn().mockImplementation(() => ["error"]);
    const setToken = jest.fn();
    const user = await signIn(
      "phu.nguyen09995@gmail.com",
      "Neversaynever!23",
      setHookError,
      setToken
    );
    // expect(user.user).toBeTruthy();
  });
  test("signup should work", async () => {
    const setHookError = jest.fn().mockImplementation(() => [""]);
    const setToken = jest.fn();
    const user = await signUp(
      "phu.nguyen09995@gmail.com",
      "Neversaynever!23",
      setHookError,
      setToken
    );
    // expect(user.user).toBeTruthy();
  });
  test("signup shouldn't work", async () => {
    const setHookError = jest.fn().mockImplementation(() => ["error"]);
    const setToken = jest.fn();
    const user = await signUp(
      "phu.t@gmail.com",
      "Neversaynever!23",
      setHookError,
      setToken
    );
  });
  test("getSubscribedList", () => {
    const db = firebase.firestore();
    getSubscribedList();
    return db
      .collection("subscribeList")
      .get()
      .then((userDocs) => {
        expect(mockCollection).toHaveBeenCalledWith("subscribeList");
      });
  });
  test("createSubscribeList", () => {
    const db = firebase.firestore();
    createSubscribeList();
    return db
      .collection("subscribeList")
      .get()
      .then((userDocs) => {
        mockAdd({
          created: "123",
          subscribedBy: "phu@mail.com",
        });
        expect(mockCollection).toHaveBeenCalledWith("subscribeList");
      });
  });
});
