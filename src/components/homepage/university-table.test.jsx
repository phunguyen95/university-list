import { render, screen } from "@testing-library/react";
import UniversityTable from "./university-table";
import FavouriteProvider from "../../provider/FavouriteProvider";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders error view without crashing", () => {
  const history = createMemoryHistory();
    const favouriteList = [];
    const setFavouriteList = jest.fn();
    const handlePagination = jest.fn()
    const currentPageIndex = 0;
    const handlePrevPage = jest.fn();
    const handleNextPage = jest.fn();
    const handleOnSelect = jest.fn()
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <UniversityTable data={[]} isSearching={false} totalCount={0} handlePagination={handlePagination} currentPageIndex={currentPageIndex} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleOnSelect={handleOnSelect}  />
      </FavouriteProvider>
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
