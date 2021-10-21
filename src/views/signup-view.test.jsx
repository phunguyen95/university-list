import React from 'react';
import { render, screen } from "@testing-library/react";
import AuthProvider from "../provider/AuthProvider";
import SignupView from "./signup-view";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
const useStateStub = jest.fn()
jest.spyOn(React,'useEffect').mockImplementationOnce(f=>f());
const mockUseState = () => {
    const setEmail = jest.fn();
    const setPassword = jest.fn();
    const setIsEmailInvalid = jest.fn();
    const setIsPasswordInvalid = jest.fn();
    const setIsChecked = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((_) => [_, setEmail])
      .mockImplementationOnce((_) => [_, setPassword])
      .mockImplementationOnce((_) => [_, setIsEmailInvalid])
      .mockImplementationOnce((_) => [_, setIsPasswordInvalid])
      .mockImplementationOnce((_) => [_, setIsChecked]);
}
test("renders signup view without crashing", () => {
  const history = createMemoryHistory();
  mockUseState();
  const handleSignup = jest.fn();
  const isLoading = false;
  const setIsLoading = jest.fn();
  const setErrors = jest.fn();
  const token = "";
  const { asFragment } = render(
    <Router history={history}>
      <AuthProvider value={{ handleSignup, isLoading,setIsLoading,setErrors,token }}>
        <SignupView />
      </AuthProvider>
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
