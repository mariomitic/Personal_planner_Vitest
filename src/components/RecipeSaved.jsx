import React from "react";

function RecipeSaved(props) {
  return (
    <div className="recipeExistsAlert recipeSaved">
      <h2 className="alertText">{props.savedDeletedMessage}</h2>
      <button
        onClick={() => props.setrecipeSavedSuccessfully(false)}
        className="recipeExistsAlertBtn recipeSavedOK"
      >
        OK
      </button>
    </div>
  );
}

export default RecipeSaved;
