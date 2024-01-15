import React, { useState } from 'react'
import "../Profile/Profile.css"
import { COMPANY_REGISTER_URL } from './companyUtils';
import customAxios from '/src/store/AxiosConfig.js'
import { handleErrorValidation } from './validation';
import toast from 'react-hot-toast';
function CompanyRegistration() {
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
    console.log('first')
    try {
      const response = await customAxios.post(`/worker/${2}/company/register` , formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
//For handling the fom submition end________________

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