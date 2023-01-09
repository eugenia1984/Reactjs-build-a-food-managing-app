import React, { useState } from "react";
import "./styles.css";
import { search } from "../../international";

const Search = (props) => {
  const { getDataFromSearchComponent } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInpuValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        onChange={handleInpuValue}
        value={inputValue}
        placeholder="Search recipies"
        id="search"
      />
      <button type="submit">{search.txtBtn}</button>
    </form>
  );
};

export default Search;
