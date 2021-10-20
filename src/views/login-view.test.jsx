import { render, screen } from "@testing-library/react";
import AuthProvider from "../provider/AuthProvider";
import LoginView from "./login-view";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
test("renders error view without crashing", () => {
  const history = createMemoryHistory();

  const handleSignIn = jest.fn();
  const isLoading = false;
  const setIsLoading = jest.fn();
  const setErrors = jest.fn();
  const token = "";
  const { asFragment } = render(
    <Router history={history}>
      <AuthProvider value={{ handleSignIn, isLoading,setIsLoading,setErrors,token }}>
        <LoginView />
      </AuthProvider>
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
