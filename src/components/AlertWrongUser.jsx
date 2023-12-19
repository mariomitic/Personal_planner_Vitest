import React from "react";

function AlertWrongUser(props) {
  const closeAlert = () => {
    props.setloginpasswordInvalid(false);
    props.setlogOrregister("login"); //returns to log in page after wrong user alert
  };

  return (
    <div>
      <div id="alertOverlay" className="overlayWrongUser">
        <div className="popup">
          <p className="wrongUserText">Wrong user name or password!</p>
          <span className="close" onClick={closeAlert}>
            Ok
          </span>
        </div>
      </div>
    </div>
  );
}

export default AlertWrongUser;
