export default function verifiedOtpValidate(value)  {
  let error = {};

  if(!value.otp){
    error.otp = "Otp is required"
  }else if(value.otp?.length !== 6){
    error.otp = "6 digit Opt required"
  }

  if(!value.email){
    error.email = "Email is required"
  }

  return error;
};
