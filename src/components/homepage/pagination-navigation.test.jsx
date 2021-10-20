import { render, screen } from "@testing-library/react";
import PaginationNavigation from "./pagination-navigation";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders pagination navigaton view without crashing", () => {
    const history = createMemoryHistory();

  const { asFragment } = render(<Router history={history}><PaginationNavigation /></Router>);

  expect(asFragment()).toMatchSnapshot();
});
