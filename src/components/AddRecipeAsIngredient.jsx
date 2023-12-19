import React from "react";

function AddRecipeAsIngredient(props) {
  return (
    <div className="addToRecipeParameters">
      <div className="enterWeightToAddDiv">
        <h3 style={{ marginBottom: "0px" }}>Enter weight of </h3>
        <h3 style={{ margin: "0px" }}>{props.recipeToPassAsIngredient.name}</h3>
        <h3 style={{ marginTop: "0px" }}> to add to your new recipe.</h3>

        <div className="enterWeigthAdd">
          <input
            className="enterWeightAddInput amountInput"
            placeholder="g"
            onChange={(e) => {
              props.setweigthToAddToRecipe(e.target.value);
            }}
            type="number"
          ></input>
          <div className="sideText">
            <p className="sideTextAdd">100g contains:</p>
            <p className="sideTextAdd">
              Calories:{" "}
              {(
                props.recipeToPassAsIngredient.recipeNutritionFacts[0]
                  .calories /
                (props.recipeWeight / 100)
              ).toFixed(1)}
              g
            </p>
            <p className="sideTextAdd">
              Net Carb:{" "}
              {(
                (props.recipeToPassAsIngredient.recipeNutritionFacts[0].carbs -
                  props.recipeToPassAsIngredient.recipeNutritionFacts[0]
                    .fiber) /
                (props.recipeWeight / 100)
              ).toFixed(1)}{" "}
              contains:
            </p>
          </div>
        </div>
      </div>

      <div className="addToOtherRecipeBtns">
        <button
          className="addToDiaryBtn1"
          onClick={props.recipeAddedAsIngredient}
        >
          OK
        </button>
        <button
          className="addToDiaryBtn2"
          onClick={() => props.setaddRecipeAsIngredient(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddRecipeAsIngredient;
