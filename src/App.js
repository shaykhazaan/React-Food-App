import React, { createContext, useState } from "react";

import "./App.css";
import Homepage from "./pages/homepage";
import ThemeButton from "./components/theme-buttton";

//create the context
//provide the context
//consume the context

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <Homepage />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
