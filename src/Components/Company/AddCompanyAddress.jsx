import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLocation } from "../Location/LocationComponet.js";
import { handleErrorValidationForAddress, validateAddressForm, validateForm } from "./validation.js";
import toast from "react-hot-toast";
import customAxios from '../../store/AxiosConfig.js'
import {COMPANY_BASE_URL, getCompanyDetails} from '../Company/companyUtils.js'
function AddCompanyAddress({props}) {
  const {setVerificationDoc} = props;
  const {setOne} = props;
  const {setAddressForm} = props;
  const [userDetails , setUserDetails] = useState()
  const [emailNotVerified , setEmailNotVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [address , setAddress] = useState({
    city: "",
    district: "",
    state: "",
    country: "",
    postalCode: "",
  })
  const [formData, setFormData] = useState({
    city: "",
    district: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [comapnyDetails , setCompanyDetails] = useState({
    companyId :'',
    companyName:'',
    companyEmail:'',
    companyNumber:'',
    companyOwnerName:'',
    companyEmailVerified:''
  })
  useEffect(()=>{
    getLocation(setAddress);
    getCompanyDetails(setCompanyDetails,setUserDetails);
    const storedCompanyData = localStorage.getItem("companyDetails");
    const companyData = JSON.parse(storedCompanyData);
    setCompanyDetails(companyData);
    if(comapnyDetails.companyAddressId && comapnyDetails.companyAddressId)
    {
      setVerificationDoc(true);
      setAddressForm(false);
    }
    else{
      setAddressForm(true);
    }
  },[])

 const handleVerificationDocOpen =()=>{

  console.log('here')
  setVerificationDoc(true);
  setOne(1);
  setAddressForm(false);
 }
  const AddLocationDetailsToFormData = (e)=>{
    e.preventDefault();
    const {name} = e.target;
    setErrors({ ...errors, [name]: "" });
    setFormData(address);
  }
  const handleChange = (e) => {
    e.preventDefault();
    const {name , value} = e.target;
    setFormData({...formData , [name]:value});
    handleErrorValidationForAddress(name , value , errors , setErrors);

  };


  const handleAddressSubmition = async (e) => {
    e.preventDefault();
    console.log(formData)
    let valid = validateAddressForm(formData);
    if(!comapnyDetails.companyEmailVerified)
    {
      setEmailNotVerified(true);
      return;
    }
    if(!valid)
    {
      toast.error("check data its not valid")
      return;
    }else{
     try {
      const response = await customAxios.post(`${COMPANY_BASE_URL}/address/create/${comapnyDetails.companyId}`,
     formData
     )
     console.log(response)
     toast.success("company address added");
     handleVerificationDocOpen();
     } catch (error) {
      console.log(error)
     }

    }
  };

  
  return (
    <>
      <form className=" w-100 p-5  ">
        <h4 className="form-header mb-2 ">Add Address</h4>
        <div>
          {emailNotVerified && (
            <>
              <label className="btn btn-outline-danger">
                Your Email is not verified check mail
              </label>
            </>
          )}
        </div>
        <button
          className="btn"
          style={{ color: "blue" }}
          onClick={AddLocationDetailsToFormData}
        >
          <i className="bx bx-current-location"></i>
          Use my Location
        </button>

        <div
          className="alert alert-warning alert-dismissible  fade show"
          role="alert"
        >
          <strong className="mx-2">Note!</strong>If the Provided Location is
          wrong type manually
        </div>
        <div className="form-group">
          <input
            type="city"
            className={`form-control my-2 ${
              errors.city ? "is-invalid" : ""
            }`}
            placeholder="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        {errors.city && (
          <div className="" style={{ color: "red" }}>
            {errors.city}
          </div>
        )}
        <div className="form-group">
          <input
            type="district"
            className={`form-control my-2 ${
              errors.district ? "is-invalid" : ""
            }`}
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
          />
        </div>
        {errors.district && (
          <div className="" style={{ color: "red" }}>
            {errors.district}
          </div>
        )}
        <div className="form-group ">
          <input
            type="state"
            className={`form-control  my-2 ${errors.state ? "is-invalid" : ""}`}
            placeholder="state "
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        {errors.state && (
          <div className="" style={{ color: "red" }}>
            {errors.state}
          </div>
        )}
        <div className="form-group">
          <input
            type="country"
            className={`form-control my-2 ${
              errors.country ? "is-invalid" : ""
            }`}
            placeholder="country "
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        {errors.country && (
          <div className="" style={{ color: "red" }}>
            {errors.country}
          </div>
        )}
        <div className="form-group">
          <input
            type="postalCode"
            className={`form-control my-2 ${
              errors.postalCode ? "is-invalid" : ""
            }`}
            placeholder="postalCode "
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
        {errors.postalCode && (
          <div className="" style={{ color: "red" }}>
            {errors.postalCode}
          </div>
        )}

        <button
          type="submit"
          onClick={handleAddressSubmition}
          className="btn btn-dark w-100 mt-3 m-0 edit-button"
        >
          Save address
        </button>
      </form>
    </>
  );
}

export default AddCompanyAddress;
