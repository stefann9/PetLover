import React, { useRef } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

const Search = ({ petTypes }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const {type} = useParams();

  const searchInputRef = useRef();
  const searchOption = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    const searchQuery = {
      name: searchInputRef.current.value,
      type: searchOption.current.value || type || searchParams.get('type'),
    };
    const query = createSearchParams(searchQuery);
    navigate({
      pathname: "/search",
      search: `?${query}`,
    });
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <details className="filter">
        <summary>Filter</summary>
        <select id="pet-select" ref={searchOption}>
          <option value="">-- Choose a pet type --</option>
          {petTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </details>
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
