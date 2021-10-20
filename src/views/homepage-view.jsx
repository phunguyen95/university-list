import React, { useState, useEffect } from "react";
import axios from "axios";
import useInputState from "../hooks/useInputState";
import useDebounce from "../hooks/useDebounce";
import _isEmpty from "lodash/isEmpty";
import "./homepage-view.scss";
import UniversityTable from "../components/homepage/university-table";
import {SORT_BY_NAME,SORT_BY_COUNTRY} from '../constants/app-constant';
export default function HomePageView() {
  const pageSize = 20;
  const [universitiesData, setUniversitiesData] = useState([]);
  const [searchText, updateSearchText] = useInputState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchResult, setCurrentSearchResult] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const debouncedSearchTerm = useDebounce(searchText, 700);

  useEffect(() => {
    async function makeCall() {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${debouncedSearchTerm}`
      );
      setIsSearching(false);
      const sortedUniversities = sortedByAlphabet(response.data,'name')
      setUniversitiesData(sortedUniversities);
      setCurrentSearchResult(sortedUniversities.slice(0, 20));
    }
    if (!_isEmpty(debouncedSearchTerm)) {
      setIsSearching(true);
      makeCall();
    } else {
      setUniversitiesData([]);
      setCurrentSearchResult([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const handlePagination = (pageNumber) => {
    if (pageNumber === 1) {
      setCurrentSearchResult(universitiesData.slice(0, pageSize));
    }
    setCurrentPageIndex(pageNumber);
    const currentIndex = pageNumber - 1;
    setCurrentSearchResult(
      universitiesData.slice(currentIndex * 20, pageSize * pageNumber)
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
      universitiesData.slice(currentIndex * 20, pageSize * pageNumber)
    );
    return currentSearchResult;
  };

  const handleNextPage = () => {
    const totalCount = universitiesData.length;
    if (currentPageIndex === Math.round(totalCount / 20)) {
      return;
    }

    const pageNumber = currentPageIndex + 1;
    const currentIndex = pageNumber - 1;
    setCurrentPageIndex(pageNumber);
    setCurrentSearchResult(
      universitiesData.slice(currentIndex * 20, pageSize * pageNumber)
    );
    return currentSearchResult;
  };
  const handleOnSelect =(event) => {
    if(event.target.value === SORT_BY_NAME ) {
        handleSortByName();
    } else {
        handleSortByCountry();
    }
  }
  const handleSortByName =() => {
      const sortedUniversitiesData = sortedByAlphabet(universitiesData,'name')
    setUniversitiesData(sortedUniversitiesData)
    setCurrentSearchResult(sortedUniversitiesData.slice(0,20))
  }

  const handleSortByCountry = () => {
    const sortedUniversitiesData = sortedByAlphabet(universitiesData,'country')
    setUniversitiesData(sortedUniversitiesData)
    setCurrentSearchResult(sortedUniversitiesData.slice(0,20))
}

  const sortedByAlphabet = (universityList, key) => {
    return universityList.sort((a, b) => a[key].localeCompare(b[key]))
  }

  return (
    <div>
      <h1 className="title">University List</h1>
      <div class="field">
        <p class="control is-expanded has-icons-right">
          <input
            class="input searchInput"
            type="search"
            placeholder="Search..."
            value={searchText}
            onChange={updateSearchText}
          />
          <span class="icon is-small is-right">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <UniversityTable
        data={!_isEmpty(currentSearchResult) ? currentSearchResult : []}
        isSearching={isSearching}
        totalCount={!_isEmpty(universitiesData) ? universitiesData.length : 0}
        handlePagination={handlePagination}
        currentPageIndex={currentPageIndex}
        handleNextPage = {handleNextPage}
        handlePrevPage={handlePrevPage}
        handleOnSelect={handleOnSelect}
      />
    </div>
  );
}
