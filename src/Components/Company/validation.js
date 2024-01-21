
export const handleErrorValidation =(name , value, errors , setErrors)=>{

    setErrors({ ...errors, [name]: "" });

    if(name === "companyName")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"company name must not be empty"
            }))
        }
        else if (value.length < 7 || value.length > 25) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "First name must be between 7 and 25 characters",
            }));
          }
    }
    else if(name === "companyOwnerName")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:" Owner name must not be empty"
            }))
        }
        else if (value.length < 7 || value.length > 15) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Owner name must be between 7 and 15 characters",
            }));
          }
    }
    else if(name === "companyEmail")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"company email must not be empty"
            }))
        }
        else if (!/\S+@\S+\.\S+/.test(value)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Enter a valid email address (example@gmail.com)",
            }));
          }
    }
    else  if (name === "companyNumber") {
        if (!/^\d+$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: " company phone Number must only contain numbers",
          }));
        } else if (value.length !== 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "compnay phone Number must be 10 digits",
          }));
        }
    }
}


let isValid = true;

export const validateForm = (formData) => {
 

  console.log(formData, 'here');

  if (formData.companyName.trim() === "" || formData.companyName.length < 7 || formData.companyName.length > 25) {
    isValid = false;
  } else {
    // Reset isValid to true when the condition is not met
    isValid = true;
  }

  if (formData.companyOwnerName.trim() === "" || formData.companyOwnerName.length < 2 || formData.companyOwnerName.length > 15) {
    isValid = false;
  }

  if (formData.companyNumber.trim() === "" || !/^\d+$/.test(formData.companyNumber) || formData.companyNumber.length !== 10) {
    isValid = false;
  }

  if (formData.companyEmail.trim() === "" || !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
    isValid = false;
  }

  console.log(isValid + "from isValid");
  return isValid;
};


export const  handleErrorValidationForAddress = (name , value , errors , setErrors)=>{
  setErrors({ ...errors, [name]: "" });
  if(name === "city")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"city name must not be empty"
            }))
        }
    }
   else if(name === "district")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"district name must not be empty"
            }))
        }
    }
    else if(name === "state")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"state name must not be empty"
            }))
        }
    }
    else if(name === "country")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"country name must not be empty"
            }))
        }
    }
    else if(name === "postalCode")
    {
        if(!value.trim())
        {
            setErrors((...prevErrors)=>({
                ...prevErrors,
                [name]:"postal Code  must not be empty"
            }))
        }
        else if (value.length !== 6) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "postal code  must be 6 digits",
          }));
        }
    }
}

let isAddressvalid = true;
export const validateAddressForm = (formData)=>{

  console.log(formData , 'from address validation')
  if (formData.city.trim() === "") {
    isAddressvalid = false;
  }

  if (formData.district.trim() === "") {
    isAddressvalid = false;
  }

  if (formData.state.trim() === "") {
    isAddressvalid = false;
  }

  if (formData.country.trim() === "") {
    isAddressvalid = false;
  }
  if (formData.postalCode.trim() === "") {
    isAddressvalid = false;
  }
return isAddressvalid;

}