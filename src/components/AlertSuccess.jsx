import React from "react";

function AlertSuccess(props) {
  const closeAlert = () => {
    props.setlogOrregister("login"); //returns to log in page after creating new user
  };

  return (
    <div>
      <div id="alertOverlay" className="overlay">
        <div className="popup">
          <p>New account created successfully!</p>
          <span className="close" onClick={closeAlert}>
            Ok
          </span>
        </div>
      </div>
    </div>
  );
}

export default AlertSuccess;
