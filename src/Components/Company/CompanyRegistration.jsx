import React, { useState } from 'react'
import "../Profile/Profile.css"
import {COMPANY_EMAIL_VERIFICATION_URL, COMPANY_REGISTER_URL } from './companyUtils';
import customAxios from '/src/store/AxiosConfig.js'
import { handleErrorValidation, validateForm } from './validation';
import toast from 'react-hot-toast';
function CompanyRegistration({props}) {
  const {setVerificationDoc,setRenderForm} = props;


 const [errors , setErrors] = useState({})
  const [formData , setFormData] = useState({
    companyName:'',
    companyEmail:'',
    companyNumber:'',
    companyOwnerName:''
  })
//for hadling the input change start------------------------>
  const handleChange =(e)=>{
    const {name , value} = e.target;
    setFormData({...formData , [name]:value});
    handleErrorValidation(name , value , errors , setErrors);
    console.log(errors)
    console.log(formData)
  }
//for hadling the input change end------------------------>

//For handling the fom submition start________________
  const handleSubmit = async (e) =>{
    e.preventDefault();
   const isValidForm = validateForm(formData);
   if(!isValidForm){
    toast.error('Please fill the form data correctly')
    return;
   }
    console.log('first')
    const userDataString = localStorage.getItem("userData")
    const userData = JSON.parse(userDataString);
    console.log(userData.userId, 'from here');
    try {
      const response = await customAxios.post(`${COMPANY_REGISTER_URL}/${userData.userId}`, formData)
      console.log(response)
      sentVerificationEmail()
      console.log("-----------start")
    // for rendering the document uploading form 
      console.log("-----------end")
      setVerificationDoc(true)
      setRenderForm(false);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      


      
    }
  }
//For handling the fom submition end________________
 
  const sentVerificationEmail = async()=>{
    try {
      const response = await customAxios.post(`${COMPANY_EMAIL_VERIFICATION_URL}/${formData.companyEmail}`)
      console.log(response);
      
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
        <form className=" w-100 p-5 ">
        <h4 className="form-header mb-2 ">Company Registration</h4>

        <div className="form-group">
          <input
            type="companyName"
            className={`form-control my-2 ${errors.companyName ? "is-invalid" : ""}`}
            placeholder="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        {errors.companyName && (
          <div className="" style={{ color: "red" }}>
            {errors.companyName}
          </div>
        )}
        <div className="form-group">
          <input
            type="companyOwnerName"
            className={`form-control my-2 ${errors.companyOwnerName ?"is-invalid" : ""}`}
            name="companyOwnerName"
            value={formData.companyOwnerName}
            onChange={handleChange}
            placeholder="Company Owner"
          />
        </div>
        {errors.companyOwnerName && (
          <div className="" style={{ color: "red" }}>
            {errors.companyOwnerName}
          </div>
        )}

        <div className="form-group">
          <input
            type="email"
            className={`form-control my-2 ${errors.companyEmail ?"is-invalid":""}`}
            placeholder="Company Email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
          />
        </div>
        {errors.companyEmail && (
          <div className="" style={{ color: "red" }}>
            {errors.companyEmail}
          </div>
        )}
        <div className="form-group mb-4">
          <input
            type="number"
            className={`form-control my-2 ${errors.companyNumber ? "is-invalid":""}`}
            placeholder="Company Number "
            name="companyNumber"
            value={formData.companyNumber}
            onChange={handleChange}
          />
        </div>
        {errors.companyNumber && (
          <div className="" style={{ color: "red" }}>
            {errors.companyNumber}
          </div>
        )}

        
      
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-dark w-100 m-0 edit-button"
        >
          Register
        </button>
      </form>
    </>
  )
}

export default CompanyRegistration