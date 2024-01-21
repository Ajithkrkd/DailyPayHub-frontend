import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLocation } from "../Location/LocationComponet.js";
import { handleErrorValidationForAddress, validateAddressForm, validateForm } from "./validation.js";
import toast from "react-hot-toast";

function AddCompanyAddress() {
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

  useEffect(()=>{
    getLocation(setAddress);
  },[])

 
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
    console.log(validateAddressForm(formData) , 'from handle address asfhj oasjdfoasjfosjafoijsodfjsoifdj')
    const valid = validateAddressForm(formData);
    if(!valid)
    {
      toast.error("check data its not valid")
      return;
    }else{
      toast.success("success")
    }
  };

  
  return (
    <>
      <form className=" w-100 p-5  ">
        <h4 className="form-header mb-2 ">Add Address</h4>
        <button
          className="btn"
          style={{ color: "blue" }}
          onClick={AddLocationDetailsToFormData}
        >
          <i class="bx bx-current-location"></i>
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
