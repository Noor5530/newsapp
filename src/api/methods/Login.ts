import Api from "../index";
import ApiConstants from "../ApiConstants";

export default function Login(data:any) {
  return Api( ApiConstants.LOGIN, data, "POST", null);
}
