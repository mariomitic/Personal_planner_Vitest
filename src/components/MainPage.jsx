import { useState, useEffect, useRef } from "react";
import React from "react";
import IngredientToAdd from "./IngredientToAdd";
import AddCustomIngredient from "./AddCustomIngredient";
import RecipeExists from "./RecipeExists";
import RecipeNotFound from "./RecipeNotFound";
import AlertComponent from "./AlertComponent";
import RecipeSaved from "./RecipeSaved";
import DeleteAccWarning from "./DeleteAccWarning";
import ClearDiaryWarning from "./ClearDiaryWarning";
import BrowseAllRecipes from "./BrowseAllRecipes";
import DailyDiary from "./DailyDiary";
import AddToDiary from "./AddToDiary";
import DeleteRecipeWarning from "./DeleteRecipeWarning";
import AlertOverlay from "./AlertOverlay";
import AddRecipeAsIngredient from "./AddRecipeAsIngredient";
import InfoPage from "./InfoPage";

function MainPage(props) {
  {
    /* to reset loginId after deletion */
  }

  const loginId = props.loginId;

  const [recipeName, setrecipeName] = useState("");
  const [recipeNameDisplay, setrecipeNameDisplay] = useState("Recipe name");
  const createNewRecipeRef = useRef();

  const [searchedItem, setsearchedItem] = useState("");
  const [searchResults, setsearchResults] = useState("");
  const [displaysearchResults, setdisplaysearchResults] = useState("");
  const [ingredientsAddedToList, setingredientsAddedToList] = useState([
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
  //send ingredientsAddedToList, setingredientsAddedToList to Browser to create function  for adding to recipe

  const [enteredAmount, setenteredAmount] = useState(0);
  const [ingredientIDnumber, setingredientIDnumber] = useState(2); //(2++) 1 and 2 left for place holders
  const [recipeWeight, setrecipeWeight] = useState(0);
  const [recipeCalories, setrecipeCalories] = useState(0);
  const [recipeCarbs, setrecipeCarbs] = useState(0);
  const [recipeFiber, setrecipeFiber] = useState(0);
  const [recipeProtein, setrecipeProtein] = useState(0);
  const [recipeFat, setrecipeFat] = useState(0);

  const noIgrFoundTxt = useRef();
  const amountInput = useRef();
  const searchInput = useRef();
  const addClrBtn = useRef();

  const [addingCustomIngr, setaddingCustomIngr] = useState(false);

  const [allRecipes, setallRecipes] = useState([]);
  const [searchedRecipe, setsearchedRecipe] = useState("");
  const searchField = useRef();
  const [searchedRecipeId, setsearchedRecipeId] = useState(0);
  const [recipeExists, setrecipeExists] = useState(false);
  const [recipeDoesNotExist, setrecipeDoesNotExist] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [recipeSavedSuccessfully, setrecipeSavedSuccessfully] = useState(false);
  const [savedDeletedMessage, setsavedDeletedMessage] = useState("");
  const saveRecipeBtn = useRef();
  const [deleteAccountWarning, setdeleteAccountWarning] = useState(false);
  const [deleteRecipeWarning, setdeleteRecipeWarning] = useState(false);
  const [clearDiaryWarning, setclearDiaryWarning] = useState(false);

  const [browseAllRecipesWindow, setbrowseAllRecipesWindow] = useState(false);
  const browseAllRecipes = useRef("");

  const [showDiary, setshowDiary] = useState(false);
  const [addToDiaryWindow, setaddToDiaryWindow] = useState(false);
  const [addToDiaryData, setaddToDiaryData] = useState([]); //uesd local var inside addToDiary() since useState is async
  const [addRecipeAsIngredient, setaddRecipeAsIngredient] = useState(false);
  const [seeInfo, setseeInfo] = useState(false);

  const focus = useRef();

  const today = new Date();
  const [todaysDate, settodaysDate] = useState(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
  );
  //needed this for clear diary

  const appId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  function handleSearchClick() {
    //PATTERN FOR ALL BLANKS IN NAME

    const pattern = /^(?!\s+$).*$/;
    const isValid = pattern.test(searchedItem);
    // if search for '   ' for some reason returns peacan

    if (searchedItem === "" || !isValid) {
      setalertMessage("No input");
    } else {
      const quantity = "100g of ";
      const ingr = quantity + searchedItem;

      fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${apiKey}&ingr=${ingr}`,
        {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-type": "applicarion/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.hints.length === 0) {
            setdisplaysearchResults("");
            noIgrFoundTxt.current.classList.remove("hiddenElement");
            return;
          } else {
            setdisplaysearchResults(data.hints[0].food.label);
            setsearchResults(data);
            noIgrFoundTxt.current.classList.add("hiddenElement");
          }
        });
      searchInput.current.value = "";
    }
  }

  useEffect(() => {
    displaysearchResults !== "" && enteredAmount > 0
      ? addClrBtn.current.classList.remove("disabled")
      : addClrBtn.current.classList.add("disabled");

    addAllValuesToNutrition();
    getAllRecipes();
    getDaily();

    ingredientsAddedToList.length < 3
      ? (setrecipeWeight(""),
        setrecipeCalories(""),
        setrecipeCarbs(""),
        setrecipeFiber(""),
        setrecipeProtein(""),
        setrecipeFat(""))
      : null;
  }, [
    ingredientsAddedToList,
    enteredAmount,
    displaysearchResults,
    recipeName,
    addToDiaryData,
  ]);

  function clearIngrField() {
    setsearchedItem("");
    setdisplaysearchResults("");
    amountInput.current.value = "";
    setenteredAmount("");
  }

  //map trough an array of added ingredients and adds all of them
  function removeSingleIngr(singleIngr) {
    let itemToRemoveId = parseInt(singleIngr);
    const filteredList = ingredientsAddedToList.filter(
      (item) => item.id !== itemToRemoveId
    );
    //removes element with id = singleIngr
    setingredientsAddedToList(filteredList);
    setrecipeNameDisplay("Recipe name");
    setrecipeName("");
    saveRecipeBtn.current.disabled = false;
  }

  function removeAllIngredients() {
    const filteredList = ingredientsAddedToList.filter((item) => item.id <= 1);
    setenteredAmount(0);
    setingredientsAddedToList(filteredList);
    setrecipeName("");
    setrecipeNameDisplay("Recipe name");
    saveRecipeBtn.current.disabled = false;
  }

  function addIngredient() {
    // takes an ingredient and put it in array of objects with ingredient data
    const newIngredientToAdd = {
      id: ingredientIDnumber,
      //continues adding next number to ID, does not re-use numbers, index !== ID (in order to keep id of new ingredient unique after deletion of previous ingredient)

      name: searchResults.hints[0].food.label,
      amount: enteredAmount,
      calories:
        searchResults.hints[0].food.nutrients.ENERC_KCAL /
        (100 / enteredAmount),
      carbs:
        searchResults.hints[0].food.nutrients.CHOCDF / (100 / enteredAmount),
      fiber:
        !searchResults.hints[0].food.nutrients.FIBTG / (100 / enteredAmount)
          ? 0
          : searchResults.hints[0].food.nutrients.FIBTG / (100 / enteredAmount),
      protein:
        searchResults.hints[0].food.nutrients.PROCNT / (100 / enteredAmount),
      fat: searchResults.hints[0].food.nutrients.FAT / (100 / enteredAmount),
    };

    setingredientsAddedToList((prevState) => [
      ...prevState,
      newIngredientToAdd,
    ]);
    setsearchedItem("");
    setdisplaysearchResults("");
    setingredientIDnumber((current) => current + 1);
    //continues adding next number to ID, does not re-use numbers, index !== ID (in order to keep id of new ingredient unique after deletion of previous ingredient)
    amountInput.current.value = "";
  }

  function addCustomIngr() {
    setaddingCustomIngr(!addingCustomIngr);
  }

  const ingredinetListContainer =
    ingredientsAddedToList.length < 3 ? null : (
      <div id="recipeIngredientList" className="recipeIngredientList">
        <br></br>
        <hr className="rounded"></hr>
        <h4 className="noIgrFound">Recipe ingredient list:</h4>

        <IngredientToAdd
          ingredientsAddedToList={ingredientsAddedToList}
          removeSingleIngr={removeSingleIngr}
          setrecipeNameDisplay={setrecipeNameDisplay}
        />

        <button className="removeAll" onClick={removeAllIngredients}>
          Cancel
        </button>
      </div>
    );

  function browseRecipes() {
    setbrowseAllRecipesWindow(!browseAllRecipesWindow);
  }

  function createNewName() {
    const pattern = /^(?!\s+$).*$/;
    const isValid = pattern.test(recipeName);

    if (!isValid || createNewRecipeRef.current.value === "") {
      setalertMessage("Blank spaces only not allowed!");
      setrecipeNameDisplay("Recipe name");
      setrecipeName("");
      createNewRecipeRef.current.value = "";
    } else if (isValid) {
      if (allRecipes.length === 0) {
        setrecipeExists(false);
        setrecipeNameDisplay(recipeName);
        createNewRecipeRef.current.value = "";
        saveRecipeBtn.current.disabled = false;
      }
      if (allRecipes.length > 0) {
        for (let i = 0; i < allRecipes.length; i++) {
          if (allRecipes[i].name === recipeName) {
            setrecipeExists(true);
            setrecipeNameDisplay("Recipe name");
            setrecipeName("");
            createNewRecipeRef.current.value = "";
            break;
          } else if (allRecipes[i].name !== recipeName) {
            setrecipeExists(false);
            setrecipeNameDisplay(recipeName);
            createNewRecipeRef.current.value = "";
            saveRecipeBtn.current.disabled = false;
          }
        }
      }
    }
  }

  function addAllValuesToNutrition() {
    let totalrecipeWeight = 0;
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalFiber = 0;
    let totalProtein = 0;
    let totalFat = 0;

    for (let i = 2; i < ingredientsAddedToList.length; i++) {
      totalrecipeWeight =
        totalrecipeWeight + parseInt(ingredientsAddedToList[i].amount);
      totalCalories = totalCalories + ingredientsAddedToList[i].calories;
      totalCarbs = totalCarbs + ingredientsAddedToList[i].carbs;
      totalFiber = totalFiber + ingredientsAddedToList[i].fiber;
      totalProtein = totalProtein + ingredientsAddedToList[i].protein;
      totalFat = totalFat + ingredientsAddedToList[i].fat;
    }

    setrecipeWeight(Math.ceil(totalrecipeWeight));
    setrecipeCalories(Math.ceil(totalCalories));
    setrecipeCarbs(Math.ceil(totalCarbs));
    setrecipeFiber(Math.ceil(totalFiber));
    setrecipeProtein(Math.ceil(totalProtein));
    setrecipeFat(Math.ceil(totalFat));
  }

  const accData = import.meta.env.VITE_JSON_PLANNER_ACC;

  const removeUser = (id) => {
    const ids = parseInt(id);

    fetch(`${accData}/${ids}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        props.setlogOrregister("login");
        props.setloginId("");
        window.location.reload();
      })
      .catch((err) => setalertMessage("From removeUser Network error: " + err));
  };

  function saveRecipe() {
    if (ingredientsAddedToList.length < 3) {
      setalertMessage("There is no ingredient list");
      return;
    }
    if (recipeName.length < 1) {
      setalertMessage("Must name the recipe!");
      return;
    }

    const newRecipeToSave = {
      name: recipeName,
      ingredientList: [],
      recipeNutritionFacts: [],
    };

    for (let i = 2; i < ingredientsAddedToList.length; i++) {
      newRecipeToSave.ingredientList.push(ingredientsAddedToList[i]);
    }

    newRecipeToSave.recipeNutritionFacts = [
      {
        weight: recipeWeight,
        calories: recipeCalories,
        carbs: recipeCarbs,
        fiber: recipeFiber,
        protein: recipeProtein,
        fat: recipeFat,
      },
    ];

    fetch(`${appRecipes}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipeToSave),
    })
      .then((res) => res.json())
      .then(setrecipeName(""))
      .catch((err) =>
        setalertMessage("From newRecipeToSave Network error: " + err)
      );

    setingredientsAddedToList([
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
    setrecipeSavedSuccessfully(true);
    setsavedDeletedMessage("Recipe saved successfully!");
    setrecipeName("");
    setrecipeNameDisplay("Recipe name");
  }

  function deleteRecipe(id) {
    if (id) {
      fetch(`${appRecipes}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) =>
          setalertMessage(`Error fetching recipes: Recipe not found! ${err}`)
        );
      setsavedDeletedMessage("Recipe deleted successfully!");
      getAllRecipes();
      setsearchedRecipeId(0);
      setingredientsAddedToList([
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
      setrecipeNameDisplay("Recipe name");
      setrecipeName("");
    }
  }

  const appRecipes = import.meta.env.VITE_JSON_PLANNER_RECIPES;

  function getAllRecipes() {
    let fetchedRecipes;

    fetch(`${appRecipes}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setallRecipes(data))
      .catch((err) => setalertMessage("Error: Recipe not found!"));
  }

  function searchAllRecipes() {
    if (allRecipes.length < 1) {
      setrecipeDoesNotExist(true);
    }
    //clear all previously displayed after search
    setingredientsAddedToList([
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
    setrecipeNameDisplay("Recipe name");
    setrecipeName("");

    for (let i = 0; i < allRecipes.length; i++) {
      let foundIngredientList;
      if (allRecipes[i].name === searchedRecipe) {
        let foundIngredient = allRecipes[i];
        setrecipeDoesNotExist(false);
        setsearchedRecipeId(allRecipes[i].id);
        setrecipeNameDisplay(allRecipes[i].name);
        setrecipeName(allRecipes[i].name);

        //disable save button
        saveRecipeBtn.current.disabled = true;

        //saves all ingredients from found recipe
        for (let j = 0; j < foundIngredient.ingredientList.length; j++) {
          setingredientsAddedToList((prevState) => [
            ...prevState,
            (foundIngredientList = {
              id: foundIngredient.ingredientList[j].id,
              name: foundIngredient.ingredientList[j].name,
              amount: foundIngredient.ingredientList[j].amount,
              calories: foundIngredient.ingredientList[j].calories,
              carbs: foundIngredient.ingredientList[j].carbs,
              fiber: foundIngredient.ingredientList[j].fiber,
              protein: foundIngredient.ingredientList[j].protein,
              fat: foundIngredient.ingredientList[j].fat,
            }),
          ]);
        }
        break;
      } else {
        setrecipeDoesNotExist(true);
      }
    }
    searchField.current.value = "";
    setsearchedRecipe("");
  }

  const [recipeToPassAsIngredient, setrecipeToPassAsIngredient] = useState();
  const [weigthToAddToRecipe, setweigthToAddToRecipe] = useState(0);

  const recipeToAddAsIngredient = (event) => {
    let index = event.target.id;
    setrecipeNameDisplay("Recipe name");
    setrecipeName("");
    setaddRecipeAsIngredient(true);
    setrecipeToPassAsIngredient(allRecipes[index]);
  };

  const recipeAddedAsIngredient = () => {
    // takes an ingredient and put it in array of objects with ingredient data
    const newIngredientToAdd = {
      id: ingredientIDnumber,
      //continues adding next number to ID, does not re-use numbers, index !== ID (in order to keep id of new ingredient unique after deletion of previous ingredient)
      name: recipeToPassAsIngredient.name,
      amount: weigthToAddToRecipe,
      calories:
        recipeToPassAsIngredient.recipeNutritionFacts[0].calories /
        (recipeToPassAsIngredient.recipeNutritionFacts[0].weight /
          weigthToAddToRecipe),
      carbs:
        recipeToPassAsIngredient.recipeNutritionFacts[0].carbs /
        (recipeToPassAsIngredient.recipeNutritionFacts[0].weight /
          weigthToAddToRecipe),
      fiber:
        recipeToPassAsIngredient.recipeNutritionFacts[0].fiber /
        (recipeToPassAsIngredient.recipeNutritionFacts[0].weight /
          weigthToAddToRecipe),
      protein:
        recipeToPassAsIngredient.recipeNutritionFacts[0].protein /
        (recipeToPassAsIngredient.recipeNutritionFacts[0].weight /
          weigthToAddToRecipe),
      fat:
        recipeToPassAsIngredient.recipeNutritionFacts[0].fat /
        (recipeToPassAsIngredient.recipeNutritionFacts[0].weight /
          weigthToAddToRecipe),
    };

    setingredientsAddedToList((prevState) => [
      ...prevState,
      newIngredientToAdd,
    ]);
    setsearchedItem("");
    setdisplaysearchResults("");
    setingredientIDnumber((current) => current + 1);
    //     //continues adding next number to ID, does not re-use numbers, index !== ID (in order to keep id of new ingredient unique after deletion of previous ingredient)
    setaddRecipeAsIngredient(false);
  };

  const accDaily = import.meta.env.VITE_JSON_PLANNER_DAILY;

  function getDaily() {
    fetch(`${accDaily}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setaddToDiaryData(data))
      .catch((err) => setalertMessage("Error daily: Recipe not found!"));
  }

  function showDialy() {
    setshowDiary(!showDiary);
  }

  function addToDiary(weightEntered, dateRef) {
    const netCarb =
      (recipeCarbs - recipeFiber) / (recipeWeight / weightEntered);
    const netCalories = recipeCalories / (recipeWeight / weightEntered);
    const diaryData = [
      {
        id: 0,
        date: dateRef,
        name: recipeName,
        weight: weightEntered,
        calorie: netCalories,
        carb: netCarb,
      },
    ];

    fetch(`${accDaily}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryData[0]),
    })
      .then((res) => res.json())
      .then(removeAllIngredients())
      .catch((err) => setalertMessage("From addToDiary Network error: " + err));
  }

  const clearAllDiary = () => {
    for (let i = 0; i < addToDiaryData.length; i++) {
      fetch(`${accDaily}/${addToDiaryData[i].id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setaddToDiaryData([]);
        })

        .catch((err) =>
          setalertMessage("From clearAllDiary Network error: " + err)
        );
    }
    setclearDiaryWarning(false);
  };

  return (
    <div className="MainPage">
      <div className="allcontainersTitle">
        <h1 className="welcomeUser">Welcome {props.loginName}</h1>
        <div className="appInfo">
        <button
          className="info"
          onClick={() => setseeInfo(true)}
               >
          <b>App Info</b>
        </button>
        <button
          className="logOut"
          onClick={() => {
            window.location.reload();
          }}
        >
          <b>LogOut</b>
        </button>
        </div>
      </div>

      <div
        className="threeContainers"
        style={{
          filter:
            deleteRecipeWarning || deleteAccountWarning || clearDiaryWarning || seeInfo
              ? "blur(5px)"
              : "none",
        }}
      >
        <div className="userInterfaceContainer1">
          <div className="userInterfaceContainer11">
            <div className="containerTitle">
              <h2>Recipe name</h2>
            </div>

            <div className="createNewRecipe">
              <input
                ref={createNewRecipeRef}
                className="createNewRecipeInput"
                placeholder="Create new (30 char)"
                onChange={(e) => {
                  setrecipeName(e.target.value);
                }}
                type="text"
                maxLength="30"
              ></input>
              <button
                className="recipeBtn"
                onClick={createNewName}
                title="Create new recipe"
              >
                {" "}
                Create
              </button>
            </div>

            <div className="searchField">
              <input
                ref={searchField}
                className="searchInput"
                onChange={(e) => {
                  setsearchedRecipe(e.target.value);
                }}
                type="text"
                placeholder="Search..."
              ></input>
              <button className="recipeBtn" onClick={() => searchAllRecipes()}>
                Search
              </button>
            </div>
            <button className="customIngrBtn" onClick={browseRecipes}>
              Browse All Recipes
            </button>
          </div>
          {/* end of container 11 */}

          {browseAllRecipesWindow ? (
            <div ref={browseAllRecipes} className="userInterfaceContainer12">
              <div className="userInterfaceContainer122">
                <BrowseAllRecipes
                  allRecipes={allRecipes}
                  setingredientsAddedToList={setingredientsAddedToList}
                  ingredientsAddedToList={ingredientsAddedToList}
                  setrecipeNameDisplay={setrecipeNameDisplay}
                  setrecipeName={setrecipeName}
                  setingredientIDnumber={setingredientIDnumber}
                  setsearchedRecipeId={setsearchedRecipeId}
                  recipeToAddAsIngredient={recipeToAddAsIngredient}
                  focus={focus}
                  //prop for disabeling save button
                  saveRecipeBtn={saveRecipeBtn}
                />
              </div>
            </div>
          ) : null}

          {addRecipeAsIngredient ? (
            <AddRecipeAsIngredient
              setaddRecipeAsIngredient={setaddRecipeAsIngredient}
              recipeToPassAsIngredient={recipeToPassAsIngredient}
              setweigthToAddToRecipe={setweigthToAddToRecipe}
              recipeAddedAsIngredient={recipeAddedAsIngredient}
              recipeWeight={recipeWeight}
            />
          ) : null}
          {/* recipeAddedAsIngredient={recipeAddedAsIngredient} */}

          {/* end of container 12 */}
        </div>
        {/* end of container 1 */}

        <div className="userInterfaceContainer2">
          <div className="userInterfaceContainer21">
            <div ref={focus} className="containerTitle">
              <h2>Add ingredients</h2>
            </div>
            <div className="searchIngrField">
              <input
                ref={searchInput}
                id="searchInput"
                className="searchInput"
                type="text"
                placeholder="Enter ingredient to find..."
                onChange={(e) => {
                  setsearchedItem(e.target.value);
                }}
              ></input>
              <button className="recipeBtn" onClick={handleSearchClick}>
                Search
              </button>
            </div>
            <a
              ref={noIgrFoundTxt}
              id="noIgrFoundTxt"
              className="noIgrFoundTxt hiddenElement"
            >
              No ingredient found
            </a>
            <div className="selectField">
              <div className="displaySelection">{displaysearchResults}</div>

              <input
                ref={amountInput}
                id="amountInput"
                className="amountInput"
                placeholder="g"
                onChange={(e) => {
                  setenteredAmount(e.target.value);
                }}
                type="number"
                min="0"
              ></input>
              <button
                ref={addClrBtn}
                className="addClrBtn disabled"
                onClick={addIngredient}
                title="Add to recipe"
              >
                Add
              </button>
              <button
                className="addClrBtn"
                onClick={clearIngrField}
                title="Clear fields"
              >
                Clear
              </button>
            </div>
            <button className="customIngrBtn" onClick={addCustomIngr}>
              Add custom Ingredient
            </button>

            <div>{ingredinetListContainer}</div>
          </div>{" "}
          {/* end of container userInterfaceContainer21 */}
          {addingCustomIngr ? (
            <AddCustomIngredient
              setaddingCustomIngr={setaddingCustomIngr}
              ingredientIDnumber={ingredientIDnumber}
              setingredientIDnumber={setingredientIDnumber}
              setingredientsAddedToList={setingredientsAddedToList}
              setalertMessage={setalertMessage}
            />
          ) : null}
        </div>
        {/* end of conteiner2 */}

        <div className="userInterfaceContainer3">
          <div className="userInterfaceContainer31">
            <div className="containerTitle">
              <h2>Nutrition values</h2>
            </div>
            <a>Nutrition values for whole recipe</a>
            <div className="recipeNameTitle">
              <h3 className="recipeNameDisplay">{recipeNameDisplay}</h3>{" "}
              <button
                className="clearName"
                onClick={() => {
                  setrecipeNameDisplay("Recipe name");
                  setrecipeName("");
                  saveRecipeBtn.current.disabled = false;
                }}
              >
                Rename
              </button>
            </div>

            <div>
              <b>Weight: {recipeWeight}g</b>
            </div>
            <br></br>

            <h4>
              {`Calories: `}
              {recipeCalories}
            </h4>
            <h4>
              {`Carbs: `}
              {recipeCarbs}
            </h4>
            <h4>
              {`Fiber: `}
              {recipeFiber}
            </h4>
            <h4>
              {`Protein: `}
              {recipeProtein}
            </h4>
            <h4>
              {`Fat: `}
              {recipeFat}
            </h4>

            <button
              ref={saveRecipeBtn}
              className="saveRecipe"
              onClick={() => saveRecipe()}
            >
              Save recipe
            </button>

            <button
              className="removeRecipe"
              onClick={() => {
                recipeName !== "" ? setdeleteRecipeWarning(true) : null;
              }}
            >
              Delete recipe
            </button>
            <hr></hr>
            <button className="saveRecipe" onClick={() => showDialy()}>
              Show Diary
            </button>
            <button
              className="addToDiary"
              onClick={() => {
                recipeName !== ""
                  ? setaddToDiaryWindow(true)
                  : setalertMessage("No ingredient name!");
              }}
            >
              Add to Diary
            </button>
          </div>
          {/* end of 31 */}

          {addRecipeAsIngredient ||
          clearDiaryWarning ||
          deleteRecipeWarning ||
          recipeSavedSuccessfully ||
          deleteAccountWarning ||
          alertMessage ||
          recipeExists ||
          recipeDoesNotExist ? (
            <AlertOverlay />
          ) : null}

          {showDiary ? (
            <div className="userInterfaceContainer32">
              <div className="userInterfaceContainer322">
                <DailyDiary addToDiaryData={addToDiaryData} />{" "}
              </div>
              <button className="removeRecipe" onClick={setclearDiaryWarning}>
                Clear diary
              </button>
            </div>
          ) : null}
          <button
            className="deleteAccount"
            onClick={() => setdeleteAccountWarning(true)}
          >
            <b>Delete account</b>
          </button>
        </div>

        {/* end of container 3 */}
      </div>

      {/* Alerts and Warnings */}
      {recipeExists ? <RecipeExists setrecipeExists={setrecipeExists} /> : null}
      {recipeDoesNotExist ? (
        <RecipeNotFound setrecipeDoesNotExist={setrecipeDoesNotExist} />
      ) : null}
      {alertMessage !== "" ? (
        <AlertComponent
          setalertMessage={setalertMessage}
          alertMessage={alertMessage}
        />
      ) : null}
      {recipeSavedSuccessfully ? (
        <RecipeSaved
          setrecipeSavedSuccessfully={setrecipeSavedSuccessfully}
          savedDeletedMessage={savedDeletedMessage}
        />
      ) : null}
      {deleteAccountWarning ? (
        <DeleteAccWarning
          setdeleteAccountWarning={setdeleteAccountWarning}
          loginId={loginId}
          removeUser={removeUser}
        />
      ) : null}
      {clearDiaryWarning ? (
        <ClearDiaryWarning
          setclearDiaryWarning={setclearDiaryWarning}
          loginId={loginId}
          clearAllDiary={clearAllDiary}
        />
      ) : null}

      {addToDiaryWindow ? (
        <AddToDiary
          setaddToDiaryWindow={setaddToDiaryWindow}
          addToDiary={addToDiary}
          setalertMessage={setalertMessage}
        />
      ) : null}
      {deleteRecipeWarning ? (
        <DeleteRecipeWarning
          setdeleteRecipeWarning={setdeleteRecipeWarning}
          deleteRecipe={deleteRecipe}
          searchedRecipeId={searchedRecipeId}
        />
      ) : null}

        {seeInfo ? (
          <InfoPage setseeInfo={setseeInfo}/>
        ) : null}
      </div>
  );
}

export default MainPage;
