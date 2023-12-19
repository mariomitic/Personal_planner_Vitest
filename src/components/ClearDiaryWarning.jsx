import React from "react";

function ClearDiaryWarning(props) {
  return (
    <div className="clearDiaryWarningAlert">
      <h2>Are you sure you want to clear diary?</h2>
      <button className="clearDiaryWarningBtn" onClick={props.clearAllDiary}>
        Yes
      </button>
      <br></br>
      <br></br>
      <button
        className="clearDiaryWarningBtn"
        onClick={() => props.setclearDiaryWarning(false)}
      >
        No
      </button>
    </div>
  );
}

export default ClearDiaryWarning;
