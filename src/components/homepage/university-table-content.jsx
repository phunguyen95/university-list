import React from "react";
import isAuthenticated from "../../helper/isAuthenticated";

export default function UniversityTableContent({
  uniInfo,
  index,
  handleAddToFavourite,
  handleRemoveFromFavourite,
  isAddedFavourite,
}) {
  const renderTable = () => {
    if (uniInfo) {
      return (
        <tr key={index}>
          <td key={`no-${index + 1}`} data-label="No">
            {index + 1}
          </td>
          <td key={`name-${index + 1}`} data-label="Name">
            {uniInfo.name}
          </td>
          <td key={`country-${index + 1}`} data-label="Country">
            {uniInfo.country}
          </td>
          <td key={`website-${index + 1}`} data-label="Website">
            {uniInfo.web_pages[0]}
          </td>
          {isAuthenticated() && (
            <td key={`action-${index + 1}`} data-label="Website">
              {!isAddedFavourite(uniInfo) ? (
                <button
                  onClick={() => handleAddToFavourite(index)}
                  className="button is-primary is-focused"
                >
                  Add to favourite
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveFromFavourite(uniInfo)}
                  className="button is-primary is-focused"
                >
                  Remove from favourite
                </button>
              )}
            </td>
          )}
        </tr>
      );
    } else {
      return (
        <tr className="is-empty">
          <td colSpan="7">
            <section className="section">
              <div className="content has-text-grey has-text-centered">
                <p>
                  <span className="icon is-large">
                    <i className="mdi mdi-emoticon-sad mdi-48px"></i>
                  </span>
                </p>
                <p>Nothing's there&hellip;</p>
              </div>
            </section>
          </td>
        </tr>
      );
    }
  };
  return <>{renderTable()}</>;
}
