import { render, screen } from "@testing-library/react";
import ErrorView from "./error-view";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders error view without crashing", () => {
    const history = createMemoryHistory();

  const { asFragment } = render(<Router history={history}><ErrorView /></Router>);

  expect(asFragment()).toMatchSnapshot();
});
