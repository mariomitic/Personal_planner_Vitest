import React from "react";

function RecipeNotFound(props) {
  return (
    <div className="recipeExistsAlert">
      <h2 className="alertText">Recipe not found!</h2>
      <button
        onClick={() => props.setrecipeDoesNotExist(false)}
        className="recipeExistsAlertBtn"
      >
        OK
      </button>
    </div>
  );
}

export default RecipeNotFound;
