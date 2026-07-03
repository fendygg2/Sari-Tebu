const BASE_URL = "http://localhost:3000/api/products";

export const getProducts = async ({ search = "", status = "", loss = false }) => {
  const token = localStorage.getItem("accessToken");

  const query = new URLSearchParams({
    search,
    status,
    loss,
  }).toString();

  const res = await fetch(`${BASE_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const createProduct = async (formData) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};