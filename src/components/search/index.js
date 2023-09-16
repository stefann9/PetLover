import React, { useRef, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

const Search = ({ petTypes }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { type } = useParams();

  const [searchSelectType, setSearchSelectType] = useState("");

  const searchInputRef = useRef();
  const searchSelectGender = useRef();
  const searchSelectCoat = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    const searchQuery = {
      name: searchInputRef.current?.value || "",
      type: searchSelectType || type || searchParams.get("type") || "",
      gender: searchSelectGender.current?.value || "",
      coat: searchSelectCoat.current?.value || "",
    };
    const query = createSearchParams(searchQuery);
    navigate({
      pathname: "/search",
      search: `?${query}`,
    });
    setSearchSelectType("");
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <details className="filter">
        <summary>Filter</summary>
        <select id="pet-select" onChange={(e) => setSearchSelectType(e.target.value)}>
          <option value="">-- Choose a pet type --</option>
          {petTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        {petTypes.map((pet) => {
          if (
            pet.name === searchSelectType ||
            pet.name === searchParams.get("type") ||
            pet.name === type
          ) {
            return (
              <>
                <select id="pet-select" ref={searchSelectGender}>
                  <option value="">-- Gender --</option>
                  {pet.genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                <select id="pet-select" ref={searchSelectCoat}>
                  <option value="">-- Coats --</option>
                  {pet.coats.map((coat) => (
                    <option key={coat} value={coat}>
                      {coat}
                    </option>
                  ))}
                </select>
              </>
            );
          }
        })}
      </details>
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
