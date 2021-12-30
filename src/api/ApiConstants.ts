/* App config for apis
 */
import remoteConfig from '@react-native-firebase/remote-config';

const ApiConstants = {
  BASE_URL: remoteConfig().getValue('BASE_URL').asString(),
  REGISTER: 'Account/RegisterUser',
  LOGIN: 'Account/login',
  LOGIN_ADMIN: 'admin/auth/login',
  SEND_NOTIFICATION: 'admin/notification',
  ALL_NEWS:
    'everything?q=apple&from=2021-03-01&to=2021-03-01&sortBy=popularity&apiKey=c746d356f2e14fb5abb898aabb5812fe',
  GET_ALL_CATEGORY: 'source/get-all-categories',
  GET_CATEGORY_NEWS: 'news?sort=-updatedAt&categories=',
  GET_CONFIG: 'config',
  GET_NEWS_DETAIL: 'news/',
};

export default ApiConstants;
