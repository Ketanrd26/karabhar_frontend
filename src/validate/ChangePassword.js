export default function passwordChanges(value)  {
  let error = {};

  if(!value.password){
    error.password = "Password is required"
  }

  if(!value.confirmPassword){
    error.confirmPassword = "Confirm Password is required"
  }else if(value.password !== value.confirmPassword){
    error.confirmPassword = "Password and Confirm Password should be same"
  }

  return error;
};
