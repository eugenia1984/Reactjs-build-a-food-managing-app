import React from "react";
import Search from "../../components/search";
import "./style.css";

const HomePage = () => {
  const getDataFromSearchComponent = (getData) => {
    async function getRecepies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=53a439d043394e38a4d1b891ad903e34&query=${getData}`)
        const result = await apiResponse.json()
        console.log(result)
      }

    getRecepies();
  };

  return (
    <div className="homepage">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />
    </div>
  );
};

export default HomePage;
