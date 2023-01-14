import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";
import { THEME_BUTTON } from "../../international";

const ThemeButton = () => {
  
  const [theme, setTheme] = useContext(ThemeContext);
  
  console.log(theme, setTheme);

  return (
    <button onClick={() => setTheme(!theme)} className="theme-button">
      {THEME_BUTTON.text}
    </button>
  );
};

export default ThemeButton;
