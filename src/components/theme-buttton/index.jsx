import { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  console.log(theme, "    ", setTheme);

  return (
    <button
      style={theme ? { backgroundColor: "#12343b" } : {}}
      onClick={() => setTheme(!theme)}
      className="themeButton"
    >
      Change Theme
    </button>
  );
};

export default ThemeButton;
