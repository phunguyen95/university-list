import React, { Fragment, useContext } from "react";
import  "./university-table.scss";
import UniversityTableContent from "./university-table-content";
import UniversityTableHeading from "./university-table-heading";
import classnames from "classnames";
import { favouriteUniList } from "../../provider/FavouriteProvider";
import { FAVOURITES_STORAGE_KEY,MAX_PAGE_VISIBLE,MAX_PAGE_TO_LOOP,TOTAL_ITEM_PER_PAGE } from "../../constants/app-constant";
import _isEmpty from 'lodash/isEmpty'
export default function UniversityTable({
  data,
  isSearching,
  totalCount,
  handlePagination,
  currentPageIndex,
  handlePrevPage,
  handleNextPage,
  handleOnSelect,
}) {
  const { favouriteList, setFavouriteList } = useContext(favouriteUniList);

  let totalPage = Math.round(totalCount / TOTAL_ITEM_PER_PAGE);
  const renderTableContent = () => {
    if (data && data.length > 0) {
      return data.map((uniInfo, index) => (
        <UniversityTableContent
          uniInfo={uniInfo}
          index={index}
          handleAddToFavourite={handleAddToFavourite}
          handleRemoveFromFavourite={handleRemoveFromFavourite}
          isAddedFavourite={isAddedFavourite}
        />
      ));
    }
    return <UniversityTableContent />;
  };

  const handleAddToFavourite = (index) => {
    const selectedUni = data[index];
    favouriteList.push(selectedUni);
    setFavouriteList([...favouriteList]);
    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(favouriteList)
    );
  };
  const handleRemoveFromFavourite = (uniInfo) => {
    let favouriteListFromStorage = JSON.parse(
      window.localStorage.getItem(FAVOURITES_STORAGE_KEY)
    );
    let newFavouriteList;
    newFavouriteList = favouriteListFromStorage.filter((data) => {
      return data.name !== uniInfo.name;
    });
    setFavouriteList([...newFavouriteList]);
    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(newFavouriteList)
    );
  };
  const isAddedFavourite = (uniInfo) => {
    const favouriteListFromStorage = JSON.parse(
      window.localStorage.getItem(FAVOURITES_STORAGE_KEY)
    );
    const isAdded = favouriteListFromStorage.some(
      (data, index) => data.name == uniInfo.name
    );
    return isAdded;
  };
  const renderPaginationOption = () => {
    let render = [];
    for (let i = 1; i <= totalPage; i++) {
      if (i === MAX_PAGE_TO_LOOP) {
        render.push(<span className="pagination-ellipsis">&hellip;</span>);
      } else if (i === MAX_PAGE_VISIBLE) {
        render.push(
          <Fragment>
            <button
              key={i}
              onClick={() => handlePagination(totalPage)}
              type="button"
              className={classnames("button", {
                "is-current": currentPageIndex === i,
              })}
            >
              {totalPage}
            </button>
          </Fragment>
        );
        return render;
      } else {
        render.push(
          <Fragment>
            <button
              key={i}
              onClick={() => handlePagination(i)}
              type="button"
              className={classnames("button", {
                "is-current": currentPageIndex === i,
              })}
            >
              {i}
            </button>
          </Fragment>
        );
      }
    }
    return render;
  };

  const renderTotalPageNumber = () => {
    if (totalPage === 0) {
      return (
        <div className="level-item">
          <small>{`Page ${currentPageIndex} of ${totalPage + 1} `}</small>
        </div>
      );
    }
    return (
      <div className="level-item">
        <small>{`Page ${currentPageIndex} of ${totalPage} `}</small>
      </div>
    );
  };

  return (
    <section className="section">
      <h4>{`Total ${totalCount} seach results`}</h4>
      <label className="label sortBy">Sort By:</label>
      <div className="select is-normal">
        <select defaultValue="name" onChange={handleOnSelect}>
          <option value="country">Country</option>
          <option value="name">Name</option>
        </select>
      </div>
      {renderTotalPageNumber()}
      <div className="container">
        <div
          className={classnames("b-table", {
            "is-loading": isSearching,
            "has-pagination": data && data.length > 0,
          })}
        >
          <div className="table-wrapper has-mobile-cards">
            <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <UniversityTableHeading />
              <tbody key ="tbody">{renderTableContent()}</tbody>
            </table>
          </div>
          <div className="notification">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div className="buttons has-addons">
                    {renderPaginationOption()}
                  </div>
                </div>
                <div className="level-right">
                  <button
                    className="pagination-previous"
                    onClick={handlePrevPage}
                    disabled={totalPage === 0 || currentPageIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPageIndex === totalPage}
                    className="pagination-next"
                    onClick={handleNextPage}
                  >
                    Next page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
