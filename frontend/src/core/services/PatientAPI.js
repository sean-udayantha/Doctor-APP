import { axiosClient } from "../plugins/interceptors/AxiosClient";

class PatientAPI{
    static create = async (payload) => {
        try {
          const response = await axiosClient().post(
            "/api/patient/create",
            payload
          );
          console.log("API ~ Forum Post ~ create ", response);
          return response;
        } catch (error) {
          console.log("ERROR-API ~ Forum Post ~ create ", error);
          return error;
        }
      }; 
      static getAll = async () => {
        try {
          const response = await axiosClient().get("/api/patient/all");
          console.log("API ~ Forum Post ~ getAll ", response);
          return response;
        } catch (error) {
          console.log("ERROR-API ~ Forum Post ~ getAll ", error);
          return error;
        }
      };  
      static getOne = async (id) => {
        try {
          const response = await axiosClient().get(`/api/patient/${id}`);
          console.log("API ~ ForUm Post ~ getOne ", response);
          return response;
        } catch (error) {
          console.log("ERROR-API ~ Forum Post ~ getOne ", error);
          return error;
        }
      };
}
export default PatientAPI;