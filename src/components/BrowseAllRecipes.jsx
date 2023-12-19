import React from "react";

const BrowseAllRecipes = (props) => {
  const showRecepiesInfo = (event) => {
    let index = event.target.id;

    let allIds = [];
    //finds largest ID used in recipe so it can continue from there up to maitain having each Id unique
    for (let i = 0; i < props.allRecipes[index].ingredientList.length; i++) {
      allIds.push(props.allRecipes[index].ingredientList[i].id);
    }
    let greatestIdNumber = Math.max(...allIds);
    props.setingredientIDnumber(greatestIdNumber + 1);

    let browsedRecipetoShow;
    let recipetoShow = props.allRecipes[index];

    //clears all previously displayed
    props.setingredientsAddedToList([
      {
        id: 0,
        name: "initial01",
        amount: "number",
        calories: "number",
        fat: "number",
        carbs: "number",
        protein: "number",
        sodium: "number",
      },
      {
        id: 1,
        name: "initial02",
        amount: "number",
        calories: "number",
        fat: "number",
        carbs: "number",
        protein: "number",
        sodium: "number",
      },
    ]);

    //disables save button
    props.saveRecipeBtn.current.disabled = true;

    //sets id and names
    props.setsearchedRecipeId(recipetoShow.id);
    props.setrecipeNameDisplay(recipetoShow.name);
    props.setrecipeName(recipetoShow.name);

    //sets recipe ingredient list
    for (let i = 0; i < recipetoShow.ingredientList.length; i++) {
      props.setingredientsAddedToList((prevState) => [
        ...prevState,
        (browsedRecipetoShow = {
          id: recipetoShow.ingredientList[i].id,
          name: recipetoShow.ingredientList[i].name,
          amount: recipetoShow.ingredientList[i].amount,
          calories: recipetoShow.ingredientList[i].calories,
          carbs: recipetoShow.ingredientList[i].carbs,
          fiber: recipetoShow.ingredientList[i].fiber,
          protein: recipetoShow.ingredientList[i].protein,
          fat: recipetoShow.ingredientList[i].fat,
        }),
      ]);
    }

    //jumps to other location
    const isMobile = window.innerWidth <= 680;
    const { x, y } = props.focus.current.getBoundingClientRect();
    if (isMobile) {
      window.scrollTo(x, y);
    }
  };

  return props.allRecipes.length > 2 ? (
    <div>
      <b> Available recipes:</b>
      <br></br>
      <br></br>
      {props.allRecipes.map((item, index) => (
        <div key={index}>
          <div className="recipeNameBrowse">
            {" "}
            <a className="recipeNameBrowseTitle">{item.name}</a>
            <button
              id={index}
              className="recipeNameBrowseAdd"
              onClick={props.recipeToAddAsIngredient}
            >
              add
            </button>
            <button
              id={index}
              className="recipeNameBrowseShow"
              onClick={showRecepiesInfo}
            >
              show
            </button>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <b>No Available recipes!</b>
    </div>
  );
};

export default BrowseAllRecipes;
