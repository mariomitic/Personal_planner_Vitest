import React from "react";

function AlertComponent(props) {
  return (
    <div className="recipeExistsAlert">
      <h2 className="alertText">{props.alertMessage}</h2>
      <button
        onClick={() => props.setalertMessage("")}
        className="recipeExistsAlertBtn"
      >
        OK
      </button>
    </div>
  );
}

export default AlertComponent;
