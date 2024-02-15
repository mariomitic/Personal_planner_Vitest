import { useState } from "react";
import "./App.css";
import "./App_max_width_680px.css";
import React from "react";

import LoginForm from "./components/LoginForm";
import RegisterPage from "./components/RegisterPage";
import MainPage from "./components/MainPage";


import "./App.css";

function App() {
  const [logOrregister, setlogOrregister] = useState("login"); //"login" after logout
  const [jsondata, setjsondata] = useState([]);
  const [loginId, setloginId] = useState(""); //reset after deletion
  const [loginName, setloginName] = useState(""); //reset after deletion
  const [loginSuccess, setloginSuccess] = useState(false); //false after log out



  if (loginSuccess === true) {
    document.body.style.backgroundImage =
      'url("../vegetables-set-left-black-slate.jpg")';
    return (
      <div>
        <a className="signature">BY MAXA</a>
        <div className="App">
          <MainPage
            setlogOrregister={setlogOrregister}
            setloginSuccess={setloginSuccess}
            jsondata={jsondata}
            //loginId={loginId}
            loginName={loginName}
            setloginId={setloginId}
          />
        </div>
      </div>
    );
  }

  if (logOrregister === "login") {
    return (
      <div className="AppLogin">

        
                <img
          src="./my-Calculate Your Food.png"
          width="400px"
          alt="Calculate Your Food"
        ></img>

        <LoginForm
          setlogOrregister={setlogOrregister}
          setjsondata={setjsondata}
          jsondata={jsondata}
          setloginId={setloginId}
          setloginName={setloginName}
          setloginSuccess={setloginSuccess}
        />

        <img
          src="./by maxa.png"
          width="100px"
          height="20px"
          alt="By Maxa"
        ></img>
         <div className="badge">
         <a href="https://www.edamam.com" title="Powered by Edamam" target="_blank"><img alt="Powered by Edamam" src="https://developer.edamam.com/images/white.png" height="40" width="200"></img></a>
         </div>
      </div>
    );
  }

  if (logOrregister === "register") {
    return (
      <div className="AppLogin">
        <img
          src="./my-Calculate Your Food.png"
          width="400px"
          alt="Calculate Your Food"
        ></img>
        <RegisterPage setlogOrregister={setlogOrregister} jsondata={jsondata} />

        <img
          src="./by maxa.png"
          width="100px"
          height="20px"
          alt="By Maxa"
        ></img>
      </div>
    );
  }
}

export default App;
