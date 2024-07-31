
const isOutdated = (todayDate: Date, day: Date) => {
    todayDate.setHours(0, 0, 0, 0);

    return day < todayDate;
};

export default isOutdated;