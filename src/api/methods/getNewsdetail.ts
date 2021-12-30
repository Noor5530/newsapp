import Api from '../index';
import ApiConstants from '../ApiConstants';

export default function getNewsDetail(id: string) {
  return Api(ApiConstants.GET_NEWS_DETAIL + id, null, 'get', null);
}
