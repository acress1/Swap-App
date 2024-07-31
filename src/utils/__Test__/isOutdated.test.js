import isOutdated from "utils/isOutdated";

describe('isOutdated.js', () => {
    describe('When Day < Today Date', () => {
        it('Should return true', () => {
            let todayDate = new Date("07-31-2024");
            let day = new Date("07-30-2024");
            let result = isOutdated(todayDate, day);

            expect(result).toBe(true);
        });
    });

    describe('When Day > Today Date', () => {
        it('Should return false', () => {
            let todayDate = new Date("07-31-2024");
            let day = new Date("08-01-2024");
            let result = isOutdated(todayDate, day);

            expect(result).toBe(false);
        });
    });
});