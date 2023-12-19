import React from "react";

function RecipeExists(props) {
  return (
    <div className="recipeExistsAlert">
      <h2 className="alertText">Recipe name already exists!</h2>
      <button
        onClick={() => props.setrecipeExists(false)}
        className="recipeExistsAlertBtn"
      >
        OK
      </button>
    </div>
  );
}

export default RecipeExists;
