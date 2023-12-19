import React from "react";

function AlertUserExists(props) {
  const closeAlert = () => {
    props.setuserExists(false);
    props.setlogOrregister("register"); //returns to log in page
  };

  return (
    <div>
      <div id="alertOverlay" className="overlay">
        <div className="popup">
          <p>User name already exists!</p>
          <span className="close" onClick={closeAlert}>
            Ok
          </span>
        </div>
      </div>
    </div>
  );
}

export default AlertUserExists;
