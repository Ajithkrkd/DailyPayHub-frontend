

let isValid = true;
let passwordChanged = false;

export const validateForm = ({ formData, errors }) => {
  if (errors.password) {
    passwordChanged = true;
    console.log(errors.password, "---------------error");
  }

  console.log(formData, 'here');

  if (formData.firstName.trim() === "" || formData.firstName.length < 7 || formData.firstName.length > 15) {
    isValid = false;
  } else {
    // Reset isValid to true when the condition is not met
    isValid = true;
  }

  if (formData.lastName.trim() === "" || formData.lastName.length < 2 || formData.lastName.length > 15) {
    isValid = false;
  }

  if (formData.phoneNumber.trim() === "" || !/^\d+$/.test(formData.phoneNumber) || formData.phoneNumber.length !== 10) {
    isValid = false;
  }

  if (formData.email.trim() === "" || !/\S+@\S+\.\S+/.test(formData.email)) {
    isValid = false;
  }

  if (passwordChanged) {
    if (formData.password.trim() === "" || formData.confirmPassword.length < 8 || formData.confirmPassword.length > 15) {
      isValid = false;
    }

    if (formData.confirmPassword.trim() === "" || formData.password !== formData.confirmPassword) {
      isValid = false;
    }
  }

  console.log(isValid + "from isValid");
  return isValid;
};



// validation.js

export const handleInputValidation = (name, value, formData, errors, setErrors) => {
  setErrors({ ...errors, [name]: "" });
  if (name === "firstName") {
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "First name cannot be empty",
      }));
    } else if (value.length < 7 || value.length > 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "First name must be between 7 and 15 characters",
      }));
    }
  }
  if (name === "lastName") {
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Last name cannot be empty",
      }));
    } else if (value.length < 2 || value.length > 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Last name must be between 2 and 15 characters",
      }));
    }
  } else if (name === "email") {
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Email cannot be empty",
      }));
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Enter a valid email address (example@gmail.com)",
      }));
    }
  }
  if (name === "phoneNumber") {
    if (!/^\d+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Phone Number must only contain numbers",
      }));
    } else if (value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Phone Number must be 10 digits",
      }));
    }
  } else if (name === "password") {
    if (!value.trim()) {
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: " password cannot be empty",
      }));
    } else if (value.length < 8 || value.length > 15) {
     
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "password must be between 8 and 15 characters",
      }));
    }
  }
  if (name === "confirmPassword") {
    if (value === formData.password) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } else if (value != formData.confirmPassword) {
      console.log(formData.password, formData.confirmPassword);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Passwords do not match",
      }));
    }
  }
};
