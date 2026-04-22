import request from '../request.js'

export async function getWebsite(route) {
  return request('get', `/restaurants/website/${route}`);
}

export async function sendNewsletter(projectId, subject, body, attachments = []) {
  return request('post', '/restaurants/newsletter', { data: { projectId, subject, body, attachments } })
}

export async function getAllRestaurants() {
  return request('get', '/restaurants/get');
}

export async function getRestaurantsTags(projectId) {
  return request('get', `/restaurants/get-tags?projectId=${projectId}`);
}

export async function getRestaurantsReviews(projectId) {
  return request('get', `/restaurants/get-reviews?projectId=${projectId}`);
}
