
const isOutdated = (todayDate, day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
};

export default isOutdated;