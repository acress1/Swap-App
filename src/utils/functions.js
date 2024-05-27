
export const BASEURL = "http://localhost:3001";

export const todayDate = new Date();

export const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
};