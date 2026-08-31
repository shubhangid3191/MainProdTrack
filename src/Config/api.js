const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () =>
  localStorage.getItem("prodtrackToken") ||
  sessionStorage.getItem("prodtrackToken");

export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("prodtrackToken");
      localStorage.removeItem("prodtrackUser");
      sessionStorage.removeItem("prodtrackToken");
      sessionStorage.removeItem("prodtrackUser");
    }

    throw new Error(data.message || "API request failed");
  }

  return data;
};

export const apiDownload = async (endpoint) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("prodtrackToken");
      localStorage.removeItem("prodtrackUser");
      sessionStorage.removeItem("prodtrackToken");
      sessionStorage.removeItem("prodtrackUser");
    }

    const data = await response.json().catch(() => ({}));

    throw new Error(data.message || "Failed to download file");
  }

  return response.blob();
};

export default apiRequest;