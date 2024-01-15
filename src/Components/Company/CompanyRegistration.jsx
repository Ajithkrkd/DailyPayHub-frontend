import React, { useState } from 'react'
import "../Profile/Profile.css"
function CompanyRegistration() {
 
  const [formData , setFormData] = useState({
    companyName:'',
    companyEmail:'',
    companyNumber:'',
    companyOwnerName:''
  })

const handleChange =(e)=>{

  const {name , value} = e.target;
  setFormData({...formData , [name]:value});
  console.log(formData)

}
const handleSubmit = async (e) =>{
  e.preventDefault();
  const response = customAxios.post("")
}

  return (
    <>
        <form className=" w-100 p-5 ">
        <h4 className="form-header mb-2 ">Company Registration</h4>

        <div class="form-group">
          <input
            type="companyName"
            className={`form-control`}
            placeholder="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        {/* {errors.firstName && (
          <div className="" style={{ color: "red" }}>
            {errors.firstName}
          </div>
        )} */}
        <div class="form-group">
          <input
            type="companyOwnerName"
            className={`form-control my-2`}
            name="companyOwnerName"
            value={formData.companyOwnerName}
            onChange={handleChange}
            placeholder="Company Owner"
          />
        </div>
        {/* {errors.email && (
          <div className="" style={{ color: "red" }}>
            {errors.email}
          </div>
        )} */}

        <div class="form-group">
          <input
            type="email"
            className={`form-control my-2 `}
            placeholder="Company Email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
          />
        </div>
        {/* {errors.lastName && (
          <div className="" style={{ color: "red" }}>
            {errors.lastName}
          </div>
        )} */}
        <div class="form-group">
          <input
            type="companyNumber"
            className={`form-control my-2`}
            placeholder="Company Number "
            name="companyNumber"
            value={formData.companyNumber}
            onChange={handleChange}
          />
        </div>
        {/* {errors.phoneNumber && (
          <div className="" style={{ color: "red" }}>
            {errors.phoneNumber}
          </div>
        )} */}

        
      
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