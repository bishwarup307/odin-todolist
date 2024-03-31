import dayjs from "dayjs";

const Calendar = (function cal() {
    const calendar = {};

    // limiting the calendar to 2024 for simplicity
    for (let i = 1; i <= 12; i++) {
        calendar[i] = {};

        const numDaysInMonth = dayjs(`${2024}-${i}-1`).daysInMonth();
        for (let j = 1; j <= numDaysInMonth; j++) {
            calendar[i][j] = [];
        }
    }

    function save() {
        localStorage.setItem("calendar", JSON.stringify(calendar));
    }

    function createEvent(task) {
        const { endDate } = task;
        const month = dayjs(endDate).month();
        const date = dayjs(endDate).date();

        calendar[`${month + 1}`][`${date}`].push(task);
        save();
    }

    return { save, createEvent };
})();

export default Calendar;
