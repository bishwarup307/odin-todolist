import dayjs from "dayjs";
import Calendar from "./Calendar";
import Task from "./Task";

export default function CalendarView() {
    const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    const container = document.createElement("div");
    container.className = "mt-16 task-container";

    const body = document.createElement("div");
    body.className = "w-full grid grid-cols-1 gap-px xl:grid-cols-7";

    const dates = Calendar.getMonthDisplay(4);
    // console.log(dates);

    WEEKDAYS.forEach((weekday) => {
        const dayDiv = document.createElement("div");
        dayDiv.className =
            "hidden calendar-block justify-center items-center px-10 py-2 xl:flex";
        const dayText = document.createElement("p");
        dayText.textContent = weekday;
        dayText.className = "uppercase text-slate-700 text-lg";
        dayDiv.appendChild(dayText);
        body.appendChild(dayDiv);
    });

    dates.forEach((date) => {
        const block = document.createElement("div");
        block.className = "calendar-block flex flex-col gap-2 pb-24 pt-4";
        const dateNum = document.createElement("p");
        dateNum.textContent = date.date;
        dateNum.className =
            "mb-6 text-2xl font-medium w-12 h-12 flex items-center justify-center";

        if (date.offset) dateNum.classList.add("text-slate-400");
        else dateNum.classList.add("text-textPrimary");

        if (dayjs().isSame(date.dateStr, "day")) {
            dateNum.classList.add("bg-bgLighter");
            dateNum.classList.add("text-white");
            dateNum.classList.add("rounded-full");
        }

        block.appendChild(dateNum);

        date.tasks.forEach((task) => {
            const taskObject = new Task({ ...task });
            block.appendChild(taskObject.displayTaskRibbon());
        });

        body.appendChild(block);
    });

    container.appendChild(body);
    return container;
}
