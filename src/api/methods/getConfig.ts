import Api from '..';
import ApiConstants from '../ApiConstants';

export default function getConfig() {
  return Api(ApiConstants.GET_CONFIG, null, 'get', null);
}
