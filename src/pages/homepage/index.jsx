import { act, useContext, useEffect, useReducer, useState } from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import FavouriteItem from "../../components/favourite-item";
import { ThemeContext } from "../../App";

const initialState = {
  filteredValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavourites":
      console.log("action:  ", action);
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const Homepage = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  //state for favourites
  const [favourites, setFavourites] = useState([]);
  //state for success api calls
  const [apiSuccess, setApiSuccess] = useState(false);

  // use reducer functionality

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    //set loadingState state to true
    setLoadingState(true);

    //calling the api

    async function getRecipies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=e4cb3687424e423d9b8672d97d24b040&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set loading state  to false
        //
        setLoadingState(false);
        setRecipes(results);
        setApiSuccess(true);
      }
    }
    getRecipies();
  };

  const addToFavourites = (getCurrentRecipieItem) => {
    let copyFavourites = [...favourites];

    const index = copyFavourites.findIndex(
      (item) => item.id === getCurrentRecipieItem.id
    );
    if (index === -1) {
      copyFavourites.push(getCurrentRecipieItem);
      setFavourites(copyFavourites);

      //save favourites in local storage
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } else {
      alert("Item already present in Favourites!");
    }
  };

  const removeFromFavourites = (id) => {
    let copyFavourites = [...favourites];

    console.log("copyFavourites:    ", copyFavourites);
    copyFavourites = copyFavourites.filter((item) => item.id !== id);

    console.log("copyFavourites After Filter  :    ", copyFavourites);

    if (copyFavourites) {
      setFavourites(copyFavourites);
      localStorage.setItem("favourites", JSON.stringify(copyFavourites));
    }
  };

  useEffect(() => {
    const extractFavourites = JSON.parse(localStorage.getItem("favourites"));
    setFavourites(extractFavourites);
  }, []);

  console.log("filteredState::::: ", filteredState);

  const filteredFavouriteItems = favourites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiSuccess={apiSuccess}
        setApiSuccess={setApiSuccess}
      />

      {/*  Show favourite items */}
      <div className="favourites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favourites-title"
        >
          Favourites
        </h1>

        <div className="search-favourites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavourites", value: event.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavourites"
            placeholder="search favourites"
          />
        </div>

        <div className="favourites">
          {filteredFavouriteItems && filteredFavouriteItems.length > 0
            ? filteredFavouriteItems.map((item) => (
                <FavouriteItem
                  removeFromFavourites={() => removeFromFavourites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>
      {/*  Show favourite items */}

      {/* Loading recipes */}
      {loadingState && (
        <div className="loading"> Loading Recipes! Please wait...</div>
      )}
      {/* Loading recipes */}

      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavourites={() => addToFavourites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Homepage;
