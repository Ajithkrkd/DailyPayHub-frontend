
import customAxios from "/src/store/AxiosConfig.js";

export const fetchUserDetails = async (setFormData, setProfilePic) => {
    try {
      const response = await customAxios.get("/user/details");
      console.log(response);
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
  