import { render, screen } from "@testing-library/react";
import SubscriptionView from "./subcription-view";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders error view without crashing", () => {
    const history = createMemoryHistory();

  const { asFragment } = render(<Router history={history}><SubscriptionView /></Router>);

  expect(asFragment()).toMatchSnapshot();
});
