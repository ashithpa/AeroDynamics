const devBaseUrl = "http://localhost:5000";
const prodBaseUrl = "https://example.com/api";
export const baseUrl = process.env.NODE_ENV === "production" ? prodBaseUrl : devBaseUrl;
