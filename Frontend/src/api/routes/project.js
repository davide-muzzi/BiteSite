import request from '../request.js';

export async function editTitle(projectId, newTitle) {
    return request('patch', '/project/edit-title', { data: { projectId, newTitle }})
}