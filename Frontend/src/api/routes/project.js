import request from '../request.js';

export async function createProject(name, tags, templateName) {
  return request('post', '/projects/create', { data: { name, tags, templateName } })
}

export async function editProject({ projectId, route, name, title }) {
  return await request('patch', '/projects/edit', { data: { projectId, route, name, title } });
}

export async function getAllProjects() {
  return request('get', '/projects')
}

export async function getSingleProject(projectId) {
  return request('get', '/projects/single', { params: { projectId } });
}

export async function togglePublish(projectId) {
  return request('patch', '/projects/toggle-publish', { data: { projectId } });
}

export async function deleteProject(projectId) {
  return request('delete', '/projects/delete', { data: { projectId } });
}
