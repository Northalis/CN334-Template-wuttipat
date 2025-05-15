export const getBaseUrl = () => {
  return "https://the-juiz-lab-app-backend.onrender.com/";
};

export const getMediaUrl = (path) => {
  if (!path) return "";
  // Remove any leading slashes from the path
  const cleanPath = path.replace(/^\//, "");
  return `${getBaseUrl()}/${cleanPath}`;
};
