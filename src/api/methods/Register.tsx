import Api from '..';
import ApiConstants from '../ApiConstants';

export default function register(data: object) {
  return Api(ApiConstants.REGISTER, data, 'post', null);
}
