export const setToken = (token) => {
  return localStorage.setItem("token", token);
};
export const getToken = () => {
  return localStorage.getItem("token") || null;
};
export const removeToken = () => {
  return localStorage.removeItem("token");
};
export const setAuthToken = (token) => {
  return localStorage.setItem("authToken", token);
};
export const getAuthToken = () => {
  return localStorage.getItem("authToken") || null;
};
export const removeAuthToken = () => {
  return localStorage.removeItem("authToken");
};
