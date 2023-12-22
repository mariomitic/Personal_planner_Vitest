import React from "react";
import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import AlertWrongUser from "./AlertWrongUser";

function LoginForm(props) {
  const [loginpasswordInvalid, setloginpasswordInvalid] = useState(false);
  const [togglePasswordVisibility, settogglePasswordVisibility] =
    useState(true);

  const passwordInput = useRef();
  const showPasswordicon = useRef();

  const accData = import.meta.env.VITE_JSON_PLANNER_ACC;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${accData}`);
        const jsonData = await response.json();
        props.setjsondata(jsonData);
       } catch (error) {
        alert("Error fetching data from LoginForm:", error);
      }
    }

    fetchData();
  }, []);

  const findUserNameandCheckPassword = (typedname, typedpassword) => {
    const userIndex = props.jsondata.findIndex(
      (user) => user.username === typedname
    );

    if (userIndex !== -1) {
      props.setloginId(props.jsondata[userIndex].id);
      props.setloginName(props.jsondata[userIndex].username);
    } else {
      setloginpasswordInvalid(true); //'Wrong user name or password!'
      return;
    }

    if (props.jsondata[userIndex].password === typedpassword) {
      props.setloginSuccess(true); //Success!'
      props.setlogOrregister("");
      return;
    } else {
      setloginpasswordInvalid(true); //'Wrong user name or password!'
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      loginname: "",
      loginpassword: "",
    },
    onSubmit: (values) => {
      formik.touched.loginpassword = true;
      formik.touched.loginname = true;
      findUserNameandCheckPassword(values.loginname, values.loginpassword);
    },
    validate: (values) => {
      let errors = {};
      if (!values.loginname) {
        errors.loginname = "Name required!";
      }
      if (!values.loginpassword) {
        errors.loginpassword = "Password required!";
      }

      return errors;
    },
  });

  const toggleVisibility = () => {
    settogglePasswordVisibility(!togglePasswordVisibility);
    if (togglePasswordVisibility && formik.values.loginpassword !== "") {
      passwordInput.current.type = "text";
      showPasswordicon.current.src = "./eye-open.png";
    } else {
      passwordInput.current.type = "password";
      showPasswordicon.current.src = "./eye-close.png";
    }
  };

  return (
    <div>
      <div className="loginContainer">
        {/* <div id="edamam-badge" data-color="white" className="edamambadge"></div>
        <hr></hr> */}
        <form onSubmit={formik.handleSubmit}>
          <h2 className="loginTitle">Login</h2>

          <div id="nameField" className="nameField">
            <input
              className="nameInput"
              type="text"
              name="loginname"
              placeholder="Name"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loginname}
            ></input>
          </div>

          {formik.touched.loginname && formik.errors.loginname ? (
            <div className="warningText">{formik.errors.loginname}</div>
          ) : null}

          <div id="passwordField" className="passwordField">
            <input
              className="passwordInput"
              ref={passwordInput}
              id="passwordInput"
              type="password"
              name="loginpassword"
              placeholder="Password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loginpassword}
            ></input>
            <img
              ref={showPasswordicon}
              id="showPasswordicon"
              src="./eye-close.png"
              onClick={toggleVisibility}
            ></img>
          </div>
          {formik.touched.loginpassword && formik.errors.loginpassword ? (
            <div className="warningText">{formik.errors.loginpassword}</div>
          ) : null}

          <div className="loginButton">
            <button
              className="registerButton"
              type="submit"
              label="submit_login"
            >
              LOGIN
            </button>

            <button
              type="button"
              className="registerButton"
              onClick={() => props.setlogOrregister("register")}
            >
              NEW USER
            </button>
          </div>
        </form>
      </div>

      {loginpasswordInvalid ? (
        <AlertWrongUser
          setlogOrregister={props.setlogOrregister}
          setloginpasswordInvalid={setloginpasswordInvalid}
        />
      ) : null}
    </div>
  );
}

export default LoginForm;
