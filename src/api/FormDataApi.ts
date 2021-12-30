import ApiConstants from './ApiConstants';
export default function formDataApi(
  path: string,
  params: any,
  method: string,
  type: string,
) {
  let options;
  let data = new FormData();
  // for (let key in params) {
  //   data.append(key, params[key]);
  // }
  data.append('user[' + type + ']', {
    uri: params.user[type],
    type: params.user.type,
    name: params.user.name,
  });

  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    method: method,
    body: data,
  };
  console.log('api url', ApiConstants.BASE_URL + path);
  console.log('params form data', options);

  return fetch(ApiConstants.BASE_URL + path, options)
    .then(resp => resp.json())
    .then(json => json)
    .catch(error => console.log('errorFormData', error));
}
