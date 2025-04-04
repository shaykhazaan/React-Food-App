import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const Search = (props) => {
  const { getDataFromSearchComponent, apiSuccess, setApiSuccess } = props;
  const { theme } = useContext(ThemeContext);

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiSuccess) {
      setInputValue("");
      setApiSuccess(false);
    }
  }, [apiSuccess]);

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="search recipies"
        id="search"
      />
      <button type="submit" style={theme ? { backgroundColor: "#12343b" } : {}}>
        search
      </button>
    </form>
  );
};

export default Search;
