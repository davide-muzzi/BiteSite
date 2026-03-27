import request from '../request.js'

export async function sendNewsletter(projectId, subject, body, attachments = []) {
  return request('post', '/restaurants/newsletter', { data: { projectId, subject, body, attachments } })
}
