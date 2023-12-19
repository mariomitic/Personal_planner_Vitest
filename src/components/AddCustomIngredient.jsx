import React from "react";
import { useState } from "react";

function AddCustomIngredient(props) {
  const [customName, setcustomName] = useState(0);
  const [customAmount, setcustomAmount] = useState(0);
  const [customCalories, setcustomCalories] = useState(0);
  const [customCarbs, setcustomCarbs] = useState(0);
  const [customFiber, setcustomFiber] = useState(0);
  const [customProtein, setcustomProtein] = useState(0);
  const [customFat, setcustomFat] = useState(0);

  function addAllToList() {
    const newIngredientToAdd = {
      id: props.ingredientIDnumber,
      name: customName,
      amount: parseInt(customAmount),
      calories: parseInt(customCalories),
      carbs: parseInt(customCarbs),
      fiber: parseInt(customFiber),
      protein: parseInt(customProtein),
      fat: parseInt(customFat),
    };

    const pattern = /^(?!\s+$).*$/;
    const isValid = pattern.test(customName);

    if (!isValid || customName === "") {
      props.setalertMessage("Blank spaces only not allowed!");
      return null;
    }
    if (
      customName === "" ||
      customAmount === "" ||
      customCalories === "" ||
      customCarbs === "" ||
      customFiber === "" ||
      customProtein === "" ||
      customFat == ""
    ) {
      props.setalertMessage("Must enter all fields!");
      return null;
    } else {
      props.setingredientsAddedToList((prevState) => [
        ...prevState,
        newIngredientToAdd,
      ]);
      props.setingredientIDnumber((current) => current + 1);
      props.setaddingCustomIngr(false);
    }
  }

  return (
    <div className="userInterfaceContainer22">
      <a className="alertCustomFields hiddenElement">Enter all fields!</a>
      <h5 className="customIngrTitle">
        Add Custom Ingredient (enter all fields):
      </h5>

      <div className="customfields">
        <label>Name:</label>
        <input
          onChange={(e) => {
            setcustomName(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>
      <div className="customfields">
        <label>Amount:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomAmount(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>
      <div className="customfields">
        <label>Calories:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomCalories(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>
      <div className="customfields">
        <label>Carbs:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomCarbs(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>

      <div className="customfields">
        <label>Fiber:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomFiber(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>
      <div className="customfields">
        <label>Protein:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomProtein(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>
      <div className="customfields">
        <label>Fat:</label>
        <input
          placeholder="g"
          type="number"
          onChange={(e) => {
            setcustomFat(e.target.value);
          }}
        ></input>
      </div>
      <hr></hr>

      <button className="addAll" onClick={addAllToList}>
        Add ingredient
      </button>
      <button
        className="removeAll"
        onClick={() => {
          props.setaddingCustomIngr(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddCustomIngredient;
