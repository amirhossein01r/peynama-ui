const API_BASE_URL = "http://localhost:8000";

const toAbsoluteUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

export { toAbsoluteUrl };
