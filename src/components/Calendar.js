import { format } from "date-fns";
import dayjs from "dayjs";

const Calendar = (function cal() {
    let calendar = loadCalendar();

    if (!calendar || Object.keys(calendar).length === 0) makeNewCalendar();

    function loadCalendar() {
        return JSON.parse(localStorage.getItem("calendar") || "{}");
    }
    function makeNewCalendar() {
        // limiting the calendar to 2024 for simplicity
        for (let i = 1; i <= 12; i++) {
            calendar[i] = {};

            const numDaysInMonth = dayjs(`${2024}-${i}-1`).daysInMonth();
            for (let j = 1; j <= numDaysInMonth; j++) {
                calendar[i][j] = [];
            }
        }
        save();
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

    function removeEvent(task) {
        const date = task.endDate;
        const month = dayjs(date).month() + 1;
        const dt = dayjs(date).date();
        calendar[month][dt] = calendar[month][dt].filter(
            (tsk) => tsk.id !== task.id
        );
        save();
    }

    function getMonth(monthIndex) {
        const month = [];
        for (let dt in calendar[`${monthIndex}`]) {
            const tasks = calendar[`${monthIndex}`][dt];
            const record = {
                date: Number(dt),
                dateStr: `2024-${monthIndex}-${dt}`,
                tasks: tasks,
            };
            month.push(record);
        }

        return month;
    }

    function getDate(date) {
        const month = dayjs(date).month() + 1;
        const dt = dayjs(date).date();
        return calendar[month][dt];
    }

    function getMonthDisplay(monthIndex) {
        const prevMonth = getMonth(monthIndex - 1);
        const currentMonth = getMonth(monthIndex);
        const nextMonth = getMonth(monthIndex + 1);

        const firstDayofMonth = dayjs(`${2024}-${monthIndex}-1`).day();
        const lastDayofMonth = dayjs(
            `${2024}-${monthIndex}-${currentMonth.at(-1).date}`
        ).day();

        const numPadLeftDays = firstDayofMonth - 0;
        const numPadRightDays = 6 - lastDayofMonth;

        for (let i = 0; i < numPadLeftDays; i++) {
            currentMonth.unshift(prevMonth.at(-i - 1));
            currentMonth[0]["offset"] = true;
        }
        for (let i = 0; i < numPadRightDays; i++) {
            currentMonth.push(nextMonth[i]);
            currentMonth[currentMonth.length - 1]["offset"] = true;
        }
        return currentMonth;
    }

    function getWeekDisplay(counter = 0) {
        const weekStartDate = dayjs()
            .add(counter * 7, "days")
            .startOf("week");
        const weekEndDate = dayjs()
            .add(counter * 7, "days")
            .endOf("week");

        const weeklyTasks = [];
        let currentDate = weekStartDate;

        while (
            currentDate.isBefore(weekEndDate) ||
            currentDate.isSame(weekEndDate)
        ) {
            const month = currentDate.month();
            const date = currentDate.date();

            const tasks = calendar[`${month + 1}`][`${date}`];

            weeklyTasks.push({
                tasks,
                date,
                month: currentDate.format("MMM"),
            });

            currentDate = currentDate.add(1, "days");
        }
        return weeklyTasks;
    }

    return {
        save,
        createEvent,
        removeEvent,
        getDate,
        getMonth,
        getMonthDisplay,
        getWeekDisplay,
    };
})();

export default Calendar;
