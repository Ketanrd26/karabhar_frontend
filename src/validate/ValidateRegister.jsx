export default function ValidateRegister(value) {
  let errors = {};
  if (!value.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(value.email)) {
    errors.email = "Email is invalid";
  }
  if (!value.Name) {
    errors.Name = "Name is required";
  }
  if (!value.password) {
    errors.password = "Password is required";
  }
  if (!value.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  }
  if (!value.mobileNumber) {
    errors.mobileNumber = "Mobile Number is required";
  }
  return errors;
}
