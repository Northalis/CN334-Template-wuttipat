export const getBaseUrl = () => {
  // Use environment variable in production, fallback to localhost for development
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3342";
};

export const getMediaUrl = (path) => {
  if (!path) return "";
  // Remove any leading slashes from the path
  const cleanPath = path.replace(/^\//, "");
  return `${getBaseUrl()}/${cleanPath}`;
};
