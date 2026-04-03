import request from '../request.js';

export async function editTitle(projectId, newTitle) {
  return request('patch', '/project/edit-title', { data: { projectId, newTitle } })
}

export async function createProject(name, tags, templateName) {
  return request('post', '/projects/create', { data: { name, tags, templateName } })
}

export async function editRoute(projectId, routeName) {
  return request('patch', '/projects/edit-route', { data: { projectId, routeName } })
}

export async function getAllProjects() {
  return request('get', '/projects')
}
