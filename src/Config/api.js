// Defines the base URL used for all backend API requests.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Gets the authentication token from local storage or session storage.
const getToken = () =>
  localStorage.getItem("prodtrackToken") ||
  sessionStorage.getItem("prodtrackToken");

// Sends normal JSON requests as well as FormData/file-upload requests.
export const apiRequest = async (endpoint, options = {}) => {
  // Gets the currently stored authentication token.
  const token = getToken();

  // Checks whether this request contains FormData such as a PDF upload.
  const isFormData = options.body instanceof FormData;

  // Sends the request to the backend.
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    // Creates the appropriate headers for JSON or FormData requests.
    headers: {
      // Adds JSON Content-Type only when the body is NOT FormData.
      ...(!isFormData
        ? {
            "Content-Type": "application/json",
          }
        : {}),

      // Adds the Bearer token when the user is logged in.
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      // Preserves any custom headers passed by the calling component.
      ...options.headers,
    },
  });

  // Converts the backend response into JSON.
  const data = await response.json();

  // Handles unsuccessful API responses.
  if (!response.ok) {
    // Clears stored login data when authentication fails.
    if (response.status === 401) {
      localStorage.removeItem("prodtrackToken");
      localStorage.removeItem("prodtrackUser");
      sessionStorage.removeItem("prodtrackToken");
      sessionStorage.removeItem("prodtrackUser");
    }

    // Throws the backend error message.
    throw new Error(data.message || "API request failed");
  }

  // Returns the successful backend response.
  return data;
};

// Downloads files such as guide PDFs from authenticated backend endpoints.
export const apiDownload = async (endpoint) => {
  // Gets the currently stored authentication token.
  const token = getToken();

  // Sends the authenticated download request.
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  // Handles unsuccessful download requests.
  if (!response.ok) {
    // Clears stored login data when authentication fails.
    if (response.status === 401) {
      localStorage.removeItem("prodtrackToken");
      localStorage.removeItem("prodtrackUser");
      sessionStorage.removeItem("prodtrackToken");
      sessionStorage.removeItem("prodtrackUser");
    }

    // Attempts to read the backend error response.
    const data = await response.json().catch(() => ({}));

    // Throws the backend download error message.
    throw new Error(data.message || "Failed to download file");
  }

  // Converts the downloaded response into a Blob.
  return response.blob();
};

// Keeps apiRequest available as the default export for existing imports.
export default apiRequest;