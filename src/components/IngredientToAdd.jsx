import React from "react";
import { useRef } from "react";

function IngredientToAdd(props) {
  const singleIngrRefs = useRef([]);
  const renderedIngredientcomponent = props.ingredientsAddedToList.map(
    (renderedIngredientcomponent, index) => {
      if (props.ingredientsAddedToList.length === 2) {
        props.setrecipeNameDisplay("Recipe name");
      }
      if (index <= 1) {
        return null;
      }

      const clickedOn = () => {
        props.removeSingleIngr(
          singleIngrRefs.current[index].getAttribute("id")
        );
      };

      return (
        <div
          ref={(ref) => (singleIngrRefs.current[index] = ref)}
          className="ingredientToAdd"
          key={index}
          id={props.ingredientsAddedToList[index].id}
        >
          <a className="ingredientToAddText">
            {index - 1}. {renderedIngredientcomponent.name}{" "}
            {renderedIngredientcomponent.amount}g
          </a>
          <a style={{ fontSize: "12px" }}>
            Cal:{Math.floor(renderedIngredientcomponent.calories)};{" "}
          </a>
          <a style={{ fontSize: "12px" }}>
            Carb:
            {Math.floor(
              renderedIngredientcomponent.carbs -
                renderedIngredientcomponent.fiber
            )}
            g
          </a>{" "}
          <button className="ingredientToRemove" onClick={clickedOn}>
            X
          </button>
        </div>
      );
    }
  );

  return <div>{renderedIngredientcomponent}</div>;
}

export default IngredientToAdd;
