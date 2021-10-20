import React, { useContext, useState, useEffect } from "react";
import { favouriteUniList } from "../provider/FavouriteProvider";
import useInputState from "../hooks/useInputState";
import useDebounce from "../hooks/useDebounce";
import "./homepage-view.scss";
import UniversityTable from "../components/homepage/university-table";
import { SORT_BY_NAME } from "../constants/app-constant";
import _isEmpty from "lodash/isEmpty";
import { FAVOURITES_STORAGE_KEY } from "../constants/app-constant";
export default function FavouriteListView() {
  const { favouriteList, setFavouriteList } = useContext(favouriteUniList);
  const favouriteListFromStorage = JSON.parse(
    window.localStorage.getItem(FAVOURITES_STORAGE_KEY)
  );

  const pageSize = 20;
  const [searchText, updateSearchText] = useInputState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchResult, setCurrentSearchResult] = useState(
    !_isEmpty(favouriteListFromStorage)
      ? favouriteListFromStorage
      : favouriteList
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const debouncedSearchTerm = useDebounce(searchText, 700);
  useEffect(() => {
    async function makeCall() {
      setTimeout(()=>{
        const result = favouriteList.filter((data, index) => {
            return data.name.includes(debouncedSearchTerm);
          });
          setIsSearching(false);
          const sortedUniversities = sortedByAlphabet(result, "name");
          setFavouriteList(sortedUniversities);
          setCurrentSearchResult(sortedUniversities.slice(0, 20));
      },100)
   
    }
    
    if (!_isEmpty(debouncedSearchTerm)) {
      setIsSearching(true);
      makeCall();
    } else {
      setFavouriteList(
        !_isEmpty(favouriteListFromStorage)
          ? favouriteListFromStorage
          : favouriteList
      );
      setCurrentSearchResult(
        !_isEmpty(favouriteListFromStorage)
          ? favouriteListFromStorage
          : favouriteList
      );
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setCurrentSearchResult(favouriteList);
  }, [favouriteList]);

  const handlePagination = (pageNumber) => {
    if (pageNumber === 1) {
      setCurrentSearchResult(favouriteList.slice(0, pageSize));
    }
    setCurrentPageIndex(pageNumber);
    const currentIndex = pageNumber - 1;
    setCurrentSearchResult(
      favouriteList.slice(currentIndex * 20, pageSize * pageNumber)
    );
    return currentSearchResult;
  };

  const handlePrevPage = () => {
    if (currentPageIndex === 1) {
      return;
    }
    const pageNumber = currentPageIndex - 1;
    const currentIndex = pageNumber - 1;
    setCurrentPageIndex(pageNumber);
    setCurrentSearchResult(
      favouriteList.slice(currentIndex * 20, pageSize * pageNumber)
    );
    return currentSearchResult;
  };

  const handleNextPage = () => {
    const totalCount = favouriteList.length;
    if (currentPageIndex === Math.round(totalCount / 20)) {
      return;
    }

    const pageNumber = currentPageIndex + 1;
    const currentIndex = pageNumber - 1;
    setCurrentPageIndex(pageNumber);
    setCurrentSearchResult(
      favouriteList.slice(currentIndex * 20, pageSize * pageNumber)
    );
    return currentSearchResult;
  };
  const handleOnSelect = (event) => {
    if (event.target.value === SORT_BY_NAME) {
      handleSortByName();
    } else {
      handleSortByCountry();
    }
  };
  const handleSortByName = () => {
    if (_isEmpty(favouriteList)) return;
    const sortedUniversitiesData = sortedByAlphabet(favouriteList, "name");
    setFavouriteList(sortedUniversitiesData);
    setCurrentSearchResult(sortedUniversitiesData.slice(0, 20));
  };

  const handleSortByCountry = () => {
    if (_isEmpty(favouriteList)) return;
    const sortedUniversitiesData = sortedByAlphabet(favouriteList, "country");
    setFavouriteList(sortedUniversitiesData);
    setCurrentSearchResult(sortedUniversitiesData.slice(0, 20));
  };

  const sortedByAlphabet = (universityList, key) => {
    if (_isEmpty(favouriteList)) return;
    return universityList.sort((a, b) => a[key].localeCompare(b[key]));
  };
  return (
    <div>
      <h1 className="title">Favourite University List</h1>
      <div className="field">
        <p className="control is-expanded has-icons-right">
          <input
            className="input searchInput"
            type="search"
            placeholder="Search..."
            value={searchText}
            onChange={updateSearchText}
          />
          <span className="icon is-small is-right">
            <i className="fas fa-search"></i>
          </span>
        </p>
      </div>
      <UniversityTable
        data={!_isEmpty(currentSearchResult) ? currentSearchResult : []}
        isSearching={isSearching}
        totalCount={!_isEmpty(favouriteList) ? favouriteList.length : 0}
        handlePagination={handlePagination}
        currentPageIndex={currentPageIndex}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleOnSelect={handleOnSelect}
      />
    </div>
  );
}
