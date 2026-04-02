import request from '../request.js';

export async function editTitle(projectId, newTitle) {
    return request('patch', '/project/edit-title', { data: { projectId, newTitle }})
}
export async function createProject(name, tags, templateName) {
    return request('post', '/projects/create', { data: { name, tags, templateName }})
}
