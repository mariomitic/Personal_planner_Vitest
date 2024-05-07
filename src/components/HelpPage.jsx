import React from 'react'

function HelpPage(props) {
  return (
    <div className='displayInfo' style={{ textAlign: "center"}}>
    App info:
    <br></br>
    <hr></hr>
    <div style={{ display: "block", textAlign: "left", width: "100%" }}>
      <p>Food planner is an app that allows you to create and save recipes with all its ingredients and be aware of relevant nutrition facts.
Additionally, you can calculate your daily consumption if you add all your intake into a diary.
</p>
   <li>First block serves to search for existing or name new recipe. Each recipe must have unique name.
There is no functionality for overwriting the existing recipe, so after recipe has changed (adding or removing the ingredient) name resets.
You can browse available recipes, show them (“show”) and then add to diary, or use them as ingredient themselves (“add”).
</li>
   <li>Second block is to search data base for ingredients to be added to the recipe. If found, type quantity wanted in grams and click add to "Recipe" or add to "Diary".
If you can't find ingredient in data base, you can add custom ingredient by filling “Add custom Ingredient” form.
</li>
   <li>Third block is to read current shown recipe stats (nutrition facts), save or delete recipe. Also, to add recipe to a daily diary or clear the diary.
Diary shows only todays values in simplified form.
</li>
   
   
   </div>
   <br></br>
   <hr></hr>
   <button className='info' style={{width: "20%" }} onClick={() => props.setseeInfo(false)}>Close</button>
    </div>
  )
}

export default HelpPage
