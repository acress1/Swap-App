
export const BASEURL = "https://swap-app-server.onrender.com";

export const todayDate = new Date();

export const isOutdated = (day) => {
  todayDate.setHours(0, 0, 0, 0);
  return day < todayDate;
};