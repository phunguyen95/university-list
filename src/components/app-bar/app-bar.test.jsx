import { render } from "@testing-library/react";
import AppBar from "./app-bar";
import AuthProvider from "../../provider/AuthProvider";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders pagination navigaton view without crashing", () => {
    const history = createMemoryHistory();
    const handleSignout = jest.fn();

    const { asFragment } = render(
        <Router history={history}>
          <AuthProvider value={{ handleSignout }}>
              <AppBar />
          </AuthProvider>
        </Router>
      );
    
  expect(asFragment()).toMatchSnapshot();
});
