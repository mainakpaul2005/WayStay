const API_URL = "http://localhost:8080/api/auth/";
const USER_API_URL = "http://localhost:8080/api/users/";

const register = async (name, email, password) => {
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

const login = (email, password) => {
  return fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getProfile = () => {
  const user = getCurrentUser();
  if (!user || !user.token) {
    return Promise.reject("Unauthorized");
  }
  return fetch(USER_API_URL + "me", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  });
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getProfile,
};

export default authService;