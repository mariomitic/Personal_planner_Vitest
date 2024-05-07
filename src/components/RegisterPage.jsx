import { useFormik } from "formik";
import { React, useState } from "react";
import AlertSuccess from "./AlertSuccess";
import AlertNetworkError from "./AlertNetworkError";
import AlertUserExists from "./AlertUserExists";

function RegisterPage(props) {
  const [success, setsuccess] = useState(false);
  const [networkError, setnetworkError] = useState(false)
  const [userExists, setuserExists] = useState(false);

  const checkForExistingUser = (load) => {
    const userName = props.jsondata;

    for (let i = 0; i < userName.length; i++) {
      if (userName[i].username === load.username) {
        setuserExists(true);
        return true;
      }
    }
  };

  // const accData = import.meta.env.VITE_JSON_PLANNER_ACC;

  const accData = import.meta.env.VITE_JSON_PLANNER_ACC_BINURL;
  const masterKey0 = "$2a$10$y";
  const masterKeyPart1 = import.meta.env.VITE_JSON_PLANNER_ACC_MASTERKEY_PART1;
  const masterKeyPart2 = import.meta.env.VITE_JSON_PLANNER_ACC_MASTERKEY_PART2;

  const masterKey = masterKey0.concat(masterKeyPart1).concat(masterKeyPart2);

  const registerNewUser = async (load) => {
    const loadMerged = [...props.jsondata, load];

    try {
      const response = await fetch(`${accData}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-MASTER-KEY": `${masterKey}`,
        },
        body: JSON.stringify(loadMerged),
        
      });
      if(response.ok){
        setsuccess(true);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
        setnetworkError(true)
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setnetworkError(true)
    }
    
  };

  const formik = useFormik({
    initialValues: {
      registername: "",
      registerpassword: "",
      registerconfirmpassword: "",
      registeremail: "",
    },

    onSubmit: (values) => {
      let load = {
        username: values.registername,
        password: values.registerpassword,
        email: values.registeremail,
      };
      if (checkForExistingUser(load) === true) {
        return null;
      } else {
        registerNewUser(load);
        
      }
    },
    validate: (values) => {
      const noSpaceRegex = /^\S*$/;
      const validemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      let errors = {};

      if (values.registername.length < 1) {
        errors.registername = "Name required!";
      }

      if (values.registername.length < 5 && values.registername.length > 0) {
        errors.registername = "Name must be at least 5 characters long!";
      }

      if (noSpaceRegex.test(values.registername) === false) {
        errors.registername = "Name cannnot contain blank spaces!";
      }

      if (values.registerpassword.length < 1) {
        errors.registerpassword = "Password required!";
      }

      if (
        values.registerpassword.length < 8 &&
        values.registerpassword.length > 0
      ) {
        errors.registerpassword =
          "Password must be at least 8 characters long!";
      }

      if (noSpaceRegex.test(values.registerpassword) === false) {
        errors.registerpassword = "Invalid password! Try again.";
      }

      if (values.registerconfirmpassword.length < 1) {
        errors.registerconfirmpassword = "Confirming new password required!";
      }

      if (values.registerconfirmpassword !== values.registerpassword) {
        errors.registerconfirmpassword = "Confirming new password failed!";
      }

      if (
        validemail.test(values.registeremail) === false &&
        values.registeremail !== ""
      ) {
        errors.registeremail = "Invalid email! Try again.";
      }

      return errors;
    },
  });

  return (
    <div>
           {/* <img
          src="./my-Calculate Your Food.png"
          width="400px"
          alt="Calculate Your Food"
        ></img> */}
      <div className="registerContainer">
 

        <form onSubmit={formik.handleSubmit}>
          <h2 className="registerTitle">Register</h2>

          <div>
            <label>Enter new name</label>
            <input
              type="text"
              name="registername"
              className="registernameField"
              onChange={formik.handleChange}
              autoComplete="current-password"
              value={formik.values.registername}
            ></input>
          </div>
          {formik.touched.registername && formik.errors.registername ? (
            <div className="warningText">{formik.errors.registername}</div>
          ) : null}

          <div>
            <label>Enter new password</label>
            <input
              type="password"
              name="registerpassword"
              className="registerpasswordField"
              onChange={formik.handleChange}
              autoComplete="current-password"
              value={formik.values.registerpassword}
            ></input>
          </div>
          {formik.touched.registerpassword && formik.errors.registerpassword ? (
            <div className="warningText">{formik.errors.registerpassword}</div>
          ) : null}

          <div>
            <label>Confirm new password</label>
            <input
              type="password"
              name="registerconfirmpassword"
              className="registerpasswordField"
              onChange={formik.handleChange}
              autoComplete="current-password"
              value={formik.values.registerconfirmpassword}
            ></input>
          </div>
          {formik.touched.registerconfirmpassword &&
          formik.errors.registerconfirmpassword ? (
            <div className="warningText">
              {formik.errors.registerconfirmpassword}
            </div>
          ) : null}

          <div>
            <label>
              <a>Email</a> <a className="optional">*optional</a>
            </label>
            <input
              type="text"
              name="registeremail"
              className="registeremailField"
              onChange={formik.handleChange}
              autoComplete="current-password"
              value={formik.values.registeremail}
            ></input>
          </div>
          {formik.errors.registeremail ? (
            <div className="warningText">{formik.errors.registeremail}</div>
          ) : null}

          <div className="newregisterButton">
            <button type="submit" className="registerNewUser">
              REGISTER NEW USER
            </button>
            <button
              type="button"
              className="registerCancel"
              onClick={() => {
                props.setlogOrregister("login");
                // window.location.reload(); //dont need it
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>

      {success ? (
        <AlertSuccess setlogOrregister={props.setlogOrregister} />
      ) : null}

      {networkError ? (
        <AlertNetworkError 
        setnetworkError={setnetworkError} 
        setlogOrregister={props.setlogOrregister} />
      ) : null}

<img
          src="./by maxa.png"
          width="100px"
          height="20px"
          alt="By Maxa"
        ></img>

      {userExists ? (
        <AlertUserExists
          setlogOrregister={props.setlogOrregister}
          setuserExists={setuserExists}
        />
      ) : null}
    </div>
  );
}

export default RegisterPage;
