import request from '../request.js'

export async function getWebsite(route) {
  return request('get', `/restaurants/website/${route}`);
}
