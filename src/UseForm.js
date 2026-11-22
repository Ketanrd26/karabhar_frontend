import { useEffect, useState } from 'react';

const UseForm = (formObj, validate, callback) => {
  const [values, setValues] = useState(formObj);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false)
    }
  }, [errors, isSubmitting]); 

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
    setErrors,
  };
};

export default UseForm;
