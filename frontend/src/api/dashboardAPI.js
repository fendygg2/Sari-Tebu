const BASE_URL = "http://localhost:3000";

export const getDashboard = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};