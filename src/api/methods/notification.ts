import apiIndex from "../indexAdmin";
import ApiConstants from "../ApiConstants";

export default function sendNotification(data: any) {
  console.log('here is the data', data)
  return apiIndex(ApiConstants.SEND_NOTIFICATION, data.body, "POST", data.credentials);
  
}
