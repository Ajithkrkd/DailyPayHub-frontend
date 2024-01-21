
//here iam use the custom axios becuse each route i want to pass the token to verify  it is WORKER
// the "customeAXIOS" have header contins token and URL "/api"
import customAxios from "../../store/AxiosConfig";
export const COMPANY_BASE_URL = `/worker/company`;
export const COMPANY_DETAILS_URL = `${COMPANY_BASE_URL}/`; //{worker_id} fetching company details by worker id
export const COMPANY_REGISTER_URL = `${COMPANY_BASE_URL}/register`
export const COMPANY_EMAIL_VERIFICATION_URL = `${COMPANY_BASE_URL}/verify-email`// {/email}
export const COMPANY_EMAIL_CONFIRM_URL = `${COMPANY_BASE_URL}/confirm-email`// {/token}


//company verification related routes
export const COMPANY_DOCUMENT_UPLOAD_URL = `worker/company/verification/documentUpload` //{companyId}

export const getCompanyDetails = async (setCompanyDetails,setUserDetails)=>{
    try {
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData);
      setUserDetails(userData);
      const response = await customAxios.get(`${COMPANY_DETAILS_URL}details/${userData.userId}` ,
      {
          headers: {
            "Content-Type": "application/json", // Correcting the header name
          },
        }
      );
      console.log(response ,"here is the response you can check");
      localStorage.setItem("companyDetails" ,JSON.stringify(response.data));
      setCompanyDetails(response.data);
    } catch (error) {
      console.log(error)
    }
  }