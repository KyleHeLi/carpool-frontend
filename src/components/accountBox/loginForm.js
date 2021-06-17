import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  BoxContainer,
  FormContainer,
  FormError,
  FieldContainer,
  FieldError,
  Input,
  MutedLink,
  MutedText,
  BoldLink,
  SubmitButton,
} from "./common";

import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const apiUrl = "http://localhost:5000/api/v1";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export function LoginForm({ setToken }) {
  const history = useHistory();
  const { switchToSignup } = useContext(AccountContext);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);

    const response = await axios
      .post(apiUrl + "/login", values)
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });

    if (response) {
      // alert("Welcome back in. Authenticating...");
      let token = response.data.token;
      if (token) {
        console.log("login token: " + token);
        localStorage.setItem("token", token);
        setToken(token);
        history.push("/dashboard");
        window.location.reload();
      }
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer className="login-box-container">
      <FormError>{error ? error : ""}</FormError>
      <FormContainer
        className="login-form-container"
        onSubmit={formik.handleSubmit}
      >
        <FieldContainer>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // show error message
          />
          <FieldError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </FieldError>
          {/* {formik.touched.email && formik.errors.email ? (
            <FieldError>{formik.errors.email}</FieldError>
          ) : undefined} */}
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // show error message
          />
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
          {/* {formik.touched.password && formik.errors.password ? (
            <FieldError>{formik.errors.password}</FieldError>
          ) : undefined} */}
        </FieldContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink className="login-muted-link" href="#">
          Forget your password?
        </MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton
          className="login-signin-button"
          type="submit"
          disabled={!formik.isValid}
        >
          Signin
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedText>
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Singup
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
}
