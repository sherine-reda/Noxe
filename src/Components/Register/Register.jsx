import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function handelregister(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisloading(false);
        setmessageError(`${err.response.data.message}`);
      });
    if (data.message === "success") {
      setisloading(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase and length 5 to 8 letter or number"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and repassword doesnt match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),
    age: Yup.string()
      .required("age is required")
      .matches(/^[1-9][0-9]?$/, "Age must be between 1 to 99 year"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,
    onSubmit: handelregister,
  });

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row d-flex m-auto justify-content-center align-items-center">
          <div className="col-md-12">
            <h3>Register Now : </h3>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <input
                className="form-control  mb-2"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger">{formik.errors.name}</div>
              ) : null}
              <input
                className="form-control  mb-2"
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
                className="form-control  mb-2"
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

              <input
                className="form-control  mb-2"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                type="password"
                name="rePassword"
                id="rePassword"
                placeholder="Repassword"
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formik.errors.rePassword}
                </div>
              ) : null}

              <input
                className="form-control  mb-2"
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger">{formik.errors.phone}</div>
              ) : null}
              <input
                className="form-control  mb-2"
                onChange={formik.handleChange}
                // value={formik.values.phone}
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                onBlur={formik.handleBlur}
              />
              {formik.errors.age && formik.touched.age ? (
                <div className="alert alert-danger">{formik.errors.age}</div>
              ) : null}

              {!isloading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-secondary   "
                >
                  Register
                </button>
              ) : (
                <button className="btn btn-secondary ">Loading...</button>
              )}

              <div className=" text-center font-sm">
                Already a member?
                <Link
                  className="nav-link py-1 px-2 text-light d-inline"
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
