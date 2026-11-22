export default function ValidateLogin(value){
    let errors = {};
    
    if(!value.credential){
     errors.credential = "Credential is required";
    }
    if(!value.password){
     errors.password = "Password is required";
    }
    return errors;
 }
 
 