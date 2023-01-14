import React, { useState, useEffect, useReducer } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item/index";
import "./style.css";
import { HOME_PAGE } from "../../international";
import FavoriteItem from "../../components/favorite-item";
import Title from "../../components/title";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const HomePage = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // save result that we receive from the API
  const [recipies, setRecipies] = useState([]);
  // favorites data state
  const [favorites, setFavorites] = useState([]);
  // state for api is succesfull or not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);
  // useReducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const getDataFromSearchComponent = (getData) => {
    // keep the loading as true before we are calling the API
    setLoading(true);

    async function getRecepies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=53a439d043394e38a4d1b891ad903e34&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        // set loading state as false again
        setLoading(false);
        // set the recepies state
        setRecipies(results);
        setApiCalledSuccess(true);
      }
    }

    getRecepies();
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      // save the favorites in localStorage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert(`${HOME_PAGE.warningMessage}`);
    }
  };

  const removeFormFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  // filter the favorites
  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />
      {/* Show favorites items*/}
      <div className="favorites-wrapper">
        <Title headline={HOME_PAGE.title} nameClass={"favorites-title"} />
        {/* Search favorites */}
        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavorites"
            placeholder={HOME_PAGE.searchPH}
          />
        </div>
        {/* Favorites list */}
        <div className="favorites">
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item, index) => (
                <FavoriteItem
                  removeFormFavorites={() => removeFormFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  key={index}
                />
              ))
            : null}
        </div>
      </div>
      {/* Show loading state*/}
      {loading && <div className="loading">{HOME_PAGE.txtLoading}</div>}
      {/* map through all the recepies*/}
      <div className="items">
        {recipies && recipies.length > 0
          ? recipies.map((item, index) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
                key={index}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default HomePage;
