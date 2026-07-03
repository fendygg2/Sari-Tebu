const BASE_URL = "http://localhost:3000/api/users";

export const getUsers = async ({ search = "", status = "" }) => {
  const token = localStorage.getItem("accessToken");

  const query = new URLSearchParams({
    search,
    status,
  }).toString();

  const res = await fetch(`${BASE_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const createUser = async (data) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};