import { useState } from 'react';
const validator = require('validator');

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });

    if (name === 'email') {
      if (validator.isEmail(value)) {
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity(
          'Введен некорректный адрес электронной почты'
        );
      }
    }
    setError({ [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  return {
    values,
    handleChange,
    error,
    isValid,
  };
}
