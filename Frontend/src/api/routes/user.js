import request from "../request.js";

export async function login(email, password) {
  return request("post", "/users/login", { data: { email, password }});
}
