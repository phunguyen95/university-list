import React, { useState, useEffect } from "react";
import _isEmpty from "lodash/isEmpty";
export const favouriteUniList = React.createContext();

const FavouriteProvider = (props) => {
  const [favouriteList, setFavouriteList] = useState([]);
  return (
    <favouriteUniList.Provider value={{ favouriteList, setFavouriteList }}>
      {props.children}
    </favouriteUniList.Provider>
  );
};
export default FavouriteProvider;
