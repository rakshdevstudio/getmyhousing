import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatSegment } from "../../common/common";
import "../../styles/SearchSuggestions.css";

const placeholders = [
  "Search By City",
  "Search By Locality",
  "Search By Pincode",
  "Search By Project Name",
  "Search By Building Name",
];

const SearchSuggetions = ({ setValue, initialValue, options }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="autocomplete">
        <input
          type="text"
          value={initialValue}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="autocomplete-input"
        />
        {options.length > 0 && (
          <ul className="autocomplete-list">
            {options.map((option) => (
              <li key={option.propertyId} className="autocomplete-item">
                <Link
                  to={`/property/${formatSegment(
                    option.listingType
                  )}/${formatSegment(option.propertyName)}/${formatSegment(
                    option.buildingType +
                    "-" +
                    option.propertyType +
                    "-in-" +
                    option.locality +
                    "-" +
                    option.city
                  )}/${option.propertyId}`}
                  className="autocomplete-link"
                >
                  {option.propertyName} {option.locality} {option.city}{" "}
                  {option.furnishingType} {option.propertyType}{" "}
                  {option.numOfBedrooms === "Studio" ||
                    option.numOfBedrooms === "1 RK"
                    ? option.numOfBedrooms
                    : option.numOfBedrooms + " BHK"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchSuggetions;
