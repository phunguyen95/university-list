import { render } from "@testing-library/react";
import FavouriteProvider from "../provider/FavouriteProvider";
import FavouriteListView from "./favourite-list-view";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
test("renders favourite view without crashing", () => {
  const history = createMemoryHistory();

    const setFavouriteList = jest.fn()
    const favouriteList = []
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <FavouriteListView />
      </FavouriteProvider>
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
