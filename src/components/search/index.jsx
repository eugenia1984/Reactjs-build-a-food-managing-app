import React, { useEffect, useState } from "react";
import "./styles.css";
import { SEARCH } from "../../international";

const Search = ({
  getDataFromSearchComponent,
  apiCalledSuccess,
  setApiCalledSuccess,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInpuValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(()=> {
      if(apiCalledSuccess) {
        setInputValue("");
        setApiCalledSuccess(false);
      }
  }, [apiCalledSuccess])

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        onChange={handleInpuValue}
        value={inputValue}
        placeholder={SEARCH.placeholderTxt}
        id="search"
      />
      <button type="submit">{SEARCH.txtBtn}</button>
    </form>
  );
};

export default Search;
