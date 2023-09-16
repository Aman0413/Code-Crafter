import * as yup from "yup";

export const signupValidation = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2)
    .max(25)
    .required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password"),
  confirmPassword: yup
    .string()
    .min(6)
    .required("Please enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginValidation = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password"),
});
