
import customAxios from "/src/store/AxiosConfig.js";



// ALl URL's the custome Axios have the start of the api {'/api'} and the headers bearer token
export const BASE_WORKER_URL = "/worker";
export const WORKER_DETAILS_URL     = `${BASE_WORKER_URL+'/details'}`;
export const WORKER_UPDATE_URL      = `${BASE_WORKER_URL+'/update-worker'}`;
export const WORKER_ADD_PROFILEPIC  = `${BASE_WORKER_URL+'/addProfilePic'}`;



export const fetchUserDetails = async (setFormData, setProfilePic) => {
    try {
      const response = await customAxios.get(WORKER_DETAILS_URL);
      console.log(response);
      localStorage.setItem("userData",JSON.stringify(response.data))
       console.log(response.data, "from uyserlkjafhsdasd");
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email,
        profileImagePath: response.data.imageUrl,
        joinDate : response.data.joinDate,
        password: null,
        confirmPassword: "",
      });
      setProfilePic(response.data.imageUrl);
     
    } catch (error) {
      console.log(error);
    }
  };
  