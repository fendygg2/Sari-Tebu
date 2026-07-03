const BASE_URL = "http://localhost:3000";

export const loginApi = async (data) => {
  const res = await fetch(`${BASE_URL}/authentication`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerApi = async (data) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const logoutApi = async (refreshToken) => {
  const res = await fetch(`${BASE_URL}/authentication`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return res.json();
};