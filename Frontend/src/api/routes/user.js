import request from "../request.js";

export async function login(email, password) {
  return request("post", "/users/login", { data: { email, password }});
}

export async function register(username, email, password, subscription) {
  return request("post", "/users/register", { data: { username, email, password, subscription }});
}

export async function checkLogin() {
  return request("get", "/users/check-login");
}

export async function logout() {
  return request("post", "/users/logout")
}

export async function editUser(username, email) {
  return request("patch", "/users/edit", { data: { username, email}})
}

export async function getUser() {
  return request("get", "/users")
}


export async function editSubscription(subscription) {
  return request("patch", "/users/edit-subscription", { data: { subscription  }})
}