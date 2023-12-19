import React from "react";

function DailyDiary(props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const noResults = (
    <div>
      <h3>Sorry, no available records.</h3>
    </div>
  );
  const results = props.addToDiaryData.filter(
    (item) => item.date === formattedDate
  );

  const totalValues = results.reduce(
    (accumulator, currentItem) => {
      return {
        totalCalories: accumulator.totalCalories + currentItem.calorie,
        totalCarbs: accumulator.totalCarbs + currentItem.carb,
      };
    },
    { totalCalories: 0, totalCarbs: 0 }
  );

  return (
    <div>
      Diary log for: <b>{formattedDate}</b>
      <hr></hr>
      {results.length > 0 ? (
        <div>
          {/* Use map to iterate over the array and create a list items for each item */}
          {results.map((item, index) => (
            <div key={index}>
              {
                <div style={{ display: "flex" }}>
                  <div>
                    <h4 style={{ marginTop: 15, width: `200px` }}>
                      {item.name}
                    </h4>
                  </div>

                  <div>
                    <p style={{ margin: 0 }}>weight: {item.weight}</p>
                    <p style={{ margin: 0 }}>
                      calories: {item.calorie.toFixed(1)}
                    </p>
                    <p style={{ marginTop: 0 }}>
                      net carbs: {item.carb.toFixed(1)}
                    </p>
                  </div>
                </div>
              }
              <hr></hr>
            </div>
          ))}
          <div>
            Total calories:<b> {totalValues.totalCalories.toFixed(1)} </b>
          </div>
          <div>
            Total net carbs:<b> {totalValues.totalCarbs.toFixed(1)}</b>
          </div>
        </div>
      ) : (
        <div>{noResults}</div>
      )}
    </div>
  );
}

export default DailyDiary;
