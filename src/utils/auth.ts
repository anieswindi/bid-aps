export const userInfo = () => {
  if (typeof window !== "undefined" && localStorage.getItem("bid-app-user")) {
    return JSON.parse(localStorage.getItem("bid-app-user"));
  }
};
