import { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const RecipeItem = (props) => {
  console.log("REcipe item props::::::::::::::::::", props);
  const { id, image, title, addToFavourites } = props;

  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        type="submit"
        onClick={addToFavourites}
        style={theme ? { backgroundColor: "#12343b" } : {}}
      >
        Add to Favourites
      </button>
    </div>
  );
};

export default RecipeItem;
