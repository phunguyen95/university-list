import { render, screen } from "@testing-library/react";
import App from "./App";
import AuthProvider from "./provider/AuthProvider";
import FavouriteProvider from "./provider/FavouriteProvider";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactDOM from "react-dom";

describe("test ReactDOM.render", () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  beforeEach(() => {
    global.document.getElementById = () => true;
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    global.document.getElementById = originalGetElement;
    ReactDOM.render = originalRender;
  });
  it("should call ReactDOM.render", () => {
    const spy = jest.spyOn(ReactDOM, "render");
    const history = createMemoryHistory();
    const handleSignout = jest.fn();
    const { asFragment } = render(
      <Router history={history}>
        <AuthProvider value={{ handleSignout }}>
          <FavouriteProvider>
            <App />
          </FavouriteProvider>
        </AuthProvider>
      </Router>
    );

    expect(spy).toHaveBeenCalled();
  });
});
