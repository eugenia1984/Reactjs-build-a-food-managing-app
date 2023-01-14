import React, { createContext, useState } from "react";
import "./App.css";
import ThemeButton from "./components/theme-buttom";
import HomePage from "./pages/homepages";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App">
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
