import { useFormik } from "formik";
import { React, useState } from "react";
import AlertSuccess from "./AlertSuccess";
import AlertUserExists from "./AlertUserExists";

function RegisterPage(props) {
  const [success, setsuccess] = useState(false);
  const [userExists, setuserExists] = useState(false);

  const checkForExistingUser = (load) => {
    const userName = props.jsondata.accountlist;

    for (let i = 0; i < userName.length; i++) {
      if (userName[i].username === load.username) {
        setuserExists(true);
        return true;
      }
    }
  };

  const registerNewUser = (load) => {
    fetch("http://localhost:3000/accountlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(load),
    })
      .then((res) => res.json())
      .catch((err) => alert(err));
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
        setsuccess(true);
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
              }}
            >
              CANCEL
            </button>
      
          </div>
        </form>
      </div>

      {success ? (
        <AlertSuccess
          setlogOrregister={() => {
            props.setlogOrregister;
          }}
        />
      ) : null}
   
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
