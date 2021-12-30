import AsyncStorage from '@react-native-community/async-storage';
import {encode} from 'base-64';

import {fetchServerConfig} from '../utils/GetConfig';
import urlConfig from '../../assets/firebaseConfig/urlConfig.json';
const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    return '';
  }
};

const getBaseUrl = async () => {
  try {
    const value = await AsyncStorage.getItem('serverConfig');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return fetchServerConfig();
    }
    return '';
  } catch (e) {
    return '';
  }
};

export default async function apiIndex(
  path: string,
  body: any,
  method: string,
  token: any,
) {
  
  //token = await getAuthToken();
  let serverConfig = await getBaseUrl();
  let urlPath = serverConfig.baseUrl + path;
console.log('Body>>', body,token)
   let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + encode(`${token.userName}` + ':' + `${token.password}`),
      
      },
     method: method,
     ...(body && {body: JSON.stringify(body)}),

    };
  
  
  console.log('options', urlPath, options);
  return fetch(urlPath, options)
    .then(json => json)
    .catch(error => {
      console.log('error', urlPath, error);
      return error;
    });
}
