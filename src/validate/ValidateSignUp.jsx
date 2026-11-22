export default function ValidateSignUp(value) {
  let errors = {};

  if (!value.mobileNumber) {
    errors.mobileNumber = "Mobile Number is required";
  }
  return errors;
}
