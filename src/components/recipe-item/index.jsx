import React from "react";
import "./styles.css";
import { RECIPE_ITEMS } from "../../international";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt={title} />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavorites}>
        {RECIPE_ITEMS.txtBtn}
      </button>
    </div>
  );
};

export default RecipeItem;
