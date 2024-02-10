import React from 'react'

function AlertNetworkError(props) {
    const closeAlert = () => {
        props.setnetworkError(false);
        props.setlogOrregister("register");
      };
  
    return (
      <div>
        <div id="alertOverlay" className="overlay">
          <div className="popup">
            <p style={{color: "red"}}>Network error! Try again.</p>
            <span className="close" onClick={closeAlert}>
              Ok
            </span>
          </div>
        </div>
      </div>
    );
  }

export default AlertNetworkError
