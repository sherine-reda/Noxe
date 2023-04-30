import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function handelLogin(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setmessageError(`${err.response.data.message}`);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setisLoading(false);
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase and length 5 to 8 letter or number"
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });
  return (
    <>
      <div className="container  mt-5">
        <div className="row  gx-0">
          <div className="col-md-12  p-5  ">
            <h3 className="mb-3">Log in Now :</h3>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}

              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : null}

              {!isLoading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-secondary  "
                >
                  Login
                </button>
              ) : (
                <button className="btn bg-secondary ">Loading...</button>
              )}
              <hr />
              
              <div className="text-main text-center font-sm">
                Not a member yet?
                <Link
                  className="nav-link py-1 px-2 text-blue d-inline text-light"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
