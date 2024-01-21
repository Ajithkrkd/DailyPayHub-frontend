import React, { useEffect, useState } from 'react'
import "../Profile/Profile.css"
import {COMPANY_BASE_URL, COMPANY_DETAILS_URL, COMPANY_EMAIL_VERIFICATION_URL, COMPANY_REGISTER_URL } from './companyUtils';
import customAxios from '/src/store/AxiosConfig.js'
import { handleErrorValidation, validateForm } from './validation';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css'
function CompanyRegistration({props}) {
  const {setRenderForm} = props;
  const {setAddressForm} = props;
  const [selectedLogo ,setSelectedLogo] = useState('');
  const [userDetails , setUserDetails] = useState(null);
  const [companyData , setCompanyData] = useState(null);
  const [companyLogo ,setCompanyLogo] = useState();
  const [emailNotVerified , setEmailNotVerified] = useState(false);
  
  useEffect(()=>{
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    setUserDetails(userData);
    const storedCompanyData = localStorage.getItem("companyDetails");
    const companyData = JSON.parse(storedCompanyData);
    setCompanyData(companyData);
    if(companyData){
      setFormData(companyData)
      console.log(companyData.companyEmail)
      if(!companyData.companyEmailVerified && companyData.companyEmail)
      {
        setEmailNotVerified(true);
      }else{
        setEmailNotVerified(false);
        setAddressForm(false);
      }
      
      setCompanyLogo(companyData.companyLogoUrl);
    }
  },[])


 const [errors , setErrors] = useState({})
  const [formData , setFormData] = useState({
    companyName:'',
    companyEmail:'',
    companyNumber:'',
    companyOwnerName:'',
    companyEmailVerified:''
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
      setAddressForm(true)
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




const handleLogoFileChange = (e)=>{
  setSelectedLogo(e.target.files[0])
}
const imageUrl = selectedLogo
? URL.createObjectURL(selectedLogo)
: "/src/assets/tailor.jpg";


const handleUploadLogo = async (e)=>{
  e.preventDefault()
  try {
    const imageData = new FormData();
    imageData.append("file" ,selectedLogo);
    const response = await customAxios.post(`${COMPANY_BASE_URL}/uploadCompanyLogo/${userDetails.userId}` , imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
    console.log(response);
    toast.success(response.data.message)
    
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
        <form className=" w-100 p-5  ">
        <h4 className="form-header mb-2 ">Company Registration</h4>
        <div>
          {emailNotVerified && (
            <>
              <label className="btn btn-outline-danger">
                Your Email is not verified check mail
              </label>
            </>
          )}
        </div>
        <div className='row d-flex align-items-center'>
        <img  src={companyLogo ? `http://localhost:9000${companyLogo}` : imageUrl} className=" col-2 p-2 companyLogoUpload"/>
       <div className='col'>
       <input
                type="file" 
                accept="image/*" 
                className="  my-4 form-control" 
                onChange={handleLogoFileChange}
                />
          <button className='btn btn-dark edit-button p-0 m-0' 
          onClick={handleUploadLogo}
          >
          {"Upload Image"}
            </button>

       </div>
        </div>
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