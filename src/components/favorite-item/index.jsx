import React from "react";
import "./styles.css";
import { FAVORITE_ITEM } from "../../international";

const FavoriteItem = ({ id, image, title, removeFormFavorites }) => {
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt={title} />
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFormFavorites}>
        {FAVORITE_ITEM.txtBtn}
      </button>
    </div>
  );
};

export default FavoriteItem;
