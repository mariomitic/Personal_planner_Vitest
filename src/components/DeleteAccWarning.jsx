import React from "react";

function DeleteAccWarning(props) {
  return (
    <div className="deleteAccountAlert">
      <h2>Are you sure you want to delete this account?</h2>
      <button
        className="deleteAccountAlertBtn"
        onClick={() => {
          props.removeUser(props.loginId), window.location.reload();
        }}
      >
        Yes
      </button>
      <br></br>
      <br></br>
      <button
        className="deleteAccountAlertBtn"
        onClick={() => props.setdeleteAccountWarning(false)}
      >
        No
      </button>
    </div>
  );
}

export default DeleteAccWarning;
