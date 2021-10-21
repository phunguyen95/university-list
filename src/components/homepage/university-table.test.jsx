import { render, screen } from "@testing-library/react";
import UniversityTable from "./university-table";
import FavouriteProvider from "../../provider/FavouriteProvider";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders university table without crashing", () => {
  const history = createMemoryHistory();
  const favouriteList = [];
  const setFavouriteList = jest.fn();
  const handlePagination = jest.fn();
  const currentPageIndex = 0;
  const handlePrevPage = jest.fn();
  const handleNextPage = jest.fn();
  const handleOnSelect = jest.fn();
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <UniversityTable
          data={[]}
          isSearching={false}
          totalCount={0}
          handlePagination={handlePagination}
          currentPageIndex={currentPageIndex}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleOnSelect={handleOnSelect}
        />
      </FavouriteProvider>
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renders university table with uniInfo", () => {
  const history = createMemoryHistory();
  const favouriteList = [
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
  ];
  const setFavouriteList = jest.fn();
  const handlePagination = jest.fn();
  const currentPageIndex = 1;
  const handlePrevPage = jest.fn();
  const handleNextPage = jest.fn();
  const handleOnSelect = jest.fn();
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <UniversityTable
          data={favouriteList}
          isSearching={false}
          totalCount={1}
          handlePagination={handlePagination}
          currentPageIndex={currentPageIndex}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleOnSelect={handleOnSelect}
        />
      </FavouriteProvider>
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renderPaginationOption with more than 11 elements", () => {
  const history = createMemoryHistory();
  const favouriteList = [
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
    {
      name: "Uni 1",
      country: "VN",
      web_pages: ["abc.xyz"],
    },
  ];
  const setFavouriteList = jest.fn();
  const handlePagination = jest.fn();
  const currentPageIndex = 1;
  const handlePrevPage = jest.fn();
  const handleNextPage = jest.fn();
  const handleOnSelect = jest.fn();
  const { asFragment } = render(
    <Router history={history}>
      <FavouriteProvider value={{ favouriteList, setFavouriteList }}>
        <UniversityTable
          data={favouriteList}
          isSearching={false}
          totalCount={240}
          handlePagination={handlePagination}
          currentPageIndex={currentPageIndex}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleOnSelect={handleOnSelect}
        />
      </FavouriteProvider>
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
