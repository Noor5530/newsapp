import Api from '../index';
import ApiConstants from '../ApiConstants';

export default function AllNews(data: any) {
  return Api(ApiConstants.ALL_NEWS, null, 'get', null);
}
