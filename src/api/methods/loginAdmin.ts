import apiIndex from "../indexAdmin";
import ApiConstants from "../ApiConstants";

export default function loginAdmin(data: any) {
  console.log('input',data)
  return apiIndex(ApiConstants.LOGIN_ADMIN, null, "POST", data);
  
}
