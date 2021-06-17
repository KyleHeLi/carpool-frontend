import React, { useContext, useState } from "react";
import axios from "axios";
import {
  BoxContainer,
  FormContainer,
  FieldContainer,
  FieldError,
  Input,
  MutedLink,
  MutedText,
  BoldLink,
  SubmitButton,
  FormSuccess,
  FormError,
} from "./common";

import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";

import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const apiUrl = "http://localhost:5000/api/v1";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Please enter your real name")
    .required("full name is required!"),
  email: yup.string().email("Please enter a valid email address").required(),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match!"),
    })
    .required("Please confirm your password"),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;

    const response = await axios
      .post(apiUrl + "/register", data)
      .catch((err) => {
        if (err && err.response) {
          console.error("Error: ", err);
          setError(err.response.data.message);
        }
        setSuccess(null);
      });

    console.log(response);

    if (response && response.data) {
      setSuccess(response.data.message);
      setError(null);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer className="login-box-container">
      {!error && success ? (
        <FormSuccess>{success ? success : ""}</FormSuccess>
      ) : undefined}
      {!success && error ? (
        <FormError>{error ? error : ""}</FormError>
      ) : undefined}
      <FormContainer
        className="login-form-container"
        onSubmit={formik.handleSubmit}
      >
        <FieldContainer>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <FieldError>{formik.errors.fullName}</FieldError>
          ) : undefined}
        </FieldContainer>
        <FieldContainer>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <FieldError>{formik.errors.email}</FieldError>
          ) : undefined}
        </FieldContainer>
        <FieldContainer>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <FieldError>{formik.errors.password}</FieldError>
          ) : undefined}
        </FieldContainer>
        <FieldContainer>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <FieldError>{formik.errors.confirmPassword}</FieldError>
          ) : undefined}
        </FieldContainer>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton
          className="login-signup-button"
          type="submit"
          // disabled={formik.isValid}
        >
          Signup
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedText>
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Singin
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
}
