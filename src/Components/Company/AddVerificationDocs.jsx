import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { COMPANY_BASE_URL, COMPANY_DETAILS_URL, COMPANY_DOCUMENT_UPLOAD_URL } from "./companyUtils";
import customAxios from "/src/store/AxiosConfig.js";
function AddVerificationDocs() {
  const [selectedValue , setSelectedValue] = useState('NULL');
  const [totalDocumentArray , setTotalDocumentArray] = useState([]);

  
  
  const handleAdharFrontChange = (e) => {
    const file = e.target.files[0];
    const updatedArray = totalDocumentArray.filter(item => item.documentType !== "ADHAR_CARD_FRONT");
    setTotalDocumentArray([...updatedArray, { file, documentType: "ADHAR_CARD_FRONT" }]);
  };
  
  const handleAdharBackFileChange = (e) => {
    const file = e.target.files[0];
    const updatedArray = totalDocumentArray.filter(item => item.documentType !== "ADHAR_CARD_BACK");
    setTotalDocumentArray([...updatedArray, { file, documentType: "ADHAR_CARD_BACK" }]);
  };
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(totalDocumentArray)
    const formData = new FormData()
    totalDocumentArray.forEach((doc)=>{
      formData.append("files" ,doc.file);
      formData.append("documentTypes" ,doc.documentType);
    })
   
    try {
      const companyStoredData = localStorage.getItem("companyDetails")
      const companyData = JSON.parse(companyStoredData);
      
      const response = await customAxios.post(`${COMPANY_DOCUMENT_UPLOAD_URL}/${22}`,formData)
      
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const imageMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    if (selectedValue == "") {
      toast.error("please select again");
    } else {
      toast.success("Document type updated");
    }
  };

  return (
    <>
      <form className=" w-100 p-5 ">
        <h4 className="form-header mb-5 ">Upload verification Documents</h4>
        <div className="row">
          <div className="col form-group mb-4">
            <p style={{ opacity: 0.5 }}>Adhar card front</p>
            <input
              type="file"
              accept={imageMimeTypes}
              className={`form-control my-2`}
              placeholder="Company Number "
              name=""
              onChange={(e) => handleAdharFrontChange(e)}
            />
          </div>
          {/* {errors.companyNumber && (
              <div className="" style={{ color: "red" }}>
                {errors.companyNumber}
              </div>
            )} */}

          <div className="col form-group mb-4">
            <p style={{ opacity: 0.5 }}>Adhar card back</p>
            <input
              type="file"
              accept={imageMimeTypes}
              className={`form-control my-2`}
              placeholder="Company Number "
              name=""
              onChange={(e) => handleAdharBackFileChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col form-group mb-4">
            <p style={{ opacity: 0.5 }}>Add any another document</p>
            <input
              type="file"
              accept={imageMimeTypes}
              className={`form-control my-2`}
              placeholder="Company Number "
              name=""
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          {/* {errors.companyNumber && (
              <div className="" style={{ color: "red" }}>
              {errors.companyNumber}
              </div>
            )} */}
          <div className="col">
            <p style={{ opacity: 0.5 }}>Select the document type</p>
            <select
              className={`form-control my-2`}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">Select Document type</option>
              <option value="DRIVING_LICENCE">Driving licence</option>
              <option value="PASSPORT">Passport</option>
              <option value="VOTER_ID">Voter ID</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-dark w-100 m-0 edit-button"
        >
          Upload
        </button>
      </form>
    </>
  );
}

export default AddVerificationDocs;
