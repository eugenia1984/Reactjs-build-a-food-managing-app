import React from "react";
import "./styles.css";
import { FAVORITE_ITEM } from "../../international";

const FavoriteItem = (props) => {
  const { id, image, title } = props;

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt={title} />
      </div>
      <p>{title}</p>
      <button type="button">
        {FAVORITE_ITEM.txtBtn}
      </button>
    </div>
  );
};

export default FavoriteItem;
