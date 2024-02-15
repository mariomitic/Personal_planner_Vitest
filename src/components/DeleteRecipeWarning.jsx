import React from "react";

function DeleteRecipeWarning(props) {
  return (
    <div className="deleteRecipeAlert">
      <h2>Are you sure you want to delete this recipe?</h2>
      <button
        className="deleteRecipeAlertBtn"
        onClick={() => {
          props.deleteRecipe(props.searchedRecipeId),
            props.setdeleteRecipeWarning(false), props.getAllRecipes();
        }}
      >
        Yes
      </button>
      <br></br>
      <br></br>
      <button
        className="deleteRecipeAlertBtn"
        onClick={() => props.setdeleteRecipeWarning(false)}
      >
        No
      </button>
    </div>
  );
}

export default DeleteRecipeWarning;
