import { render, screen } from "@testing-library/react";
import App from "./App";
import AuthProvider from "./provider/AuthProvider";
import FavouriteProvider from "./provider/FavouriteProvider";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
test("renders app", () => {
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

  expect(asFragment()).toMatchSnapshot();
});
