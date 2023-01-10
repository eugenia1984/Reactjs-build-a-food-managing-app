import React, { useState, useEffect } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item/index";
import "./style.css";
import { HOME_PAGE } from "../../international";
import FavoriteItem from "../../components/favorite-item";
import Title from "../../components/title";

const HomePage = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // save result that we receive from the API
  const [recipies, setRecipies] = useState([]);
  // favorites data state
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div className="homepage">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />
      {/* Show favorites items*/}
      <div className="favorites-wrapper">
        <Title headline={HOME_PAGE.title} nameClass={"favorites-title"}/>
        <div className="favorites">
          {
            favorites && favorites.length > 0 ?
            favorites.map((item,index) => (
              <FavoriteItem 
                id={item.id}
                image={item.image}
                title={item.title}
                key={index}
              />
            ))
            :
            null
          }
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
