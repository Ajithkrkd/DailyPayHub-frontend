
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