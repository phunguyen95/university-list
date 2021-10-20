import { render, screen } from "@testing-library/react";
import HomepageView from "./homepage-view";
import FavouriteProvider from "../provider/FavouriteProvider";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders error view without crashing", () => {
  const history = createMemoryHistory();
    const favouriteList = [];
    const setFavouriteList = jest.fn();
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <HomepageView />
      </FavouriteProvider>
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
