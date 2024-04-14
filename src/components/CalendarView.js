import dayjs from "dayjs";
import Calendar from "./Calendar";
import Task from "./Task";

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let idx = Number(dayjs().format("MM"));

export default function CalendarView() {
    const container = document.createElement("div");
    container.className = "mt-16 task-container";

    const nav = document.createElement("div");
    nav.className =
        "flex justify-between items-center px-4 mb-8 bg-slate-50 border-[1px] rounded-full border-slate-200 shadow-sm";
    const btnPrev = document.createElement("button");
    btnPrev.className = "px-2 py-1 rounded-md w-10";
    btnPrev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="angle-left"><path fill="#022431" d="M11.3,12l3.5-3.5c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2l0,0c-0.4,0.4-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L11.3,12z"></path></svg>`;
    nav.appendChild(btnPrev);

    const month = document.createElement("p");
    month.textContent = dayjs().format("MMM").toUpperCase();
    month.className = "font-bold tracking-widest text-textPrimary";
    nav.appendChild(month);

    const btnNext = document.createElement("button");
    btnNext.className = "px-2 py-1 rounded-md w-10";
    btnNext.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="angle-right"><path fill="#022431" d="M9.9,17.2c-0.6,0-1-0.4-1-1c0-0.3,0.1-0.5,0.3-0.7l3.5-3.5L9.2,8.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l4.2,4.2c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0l-4.2,4.2C10.4,17.1,10.1,17.2,9.9,17.2z"></path></svg>`;
    nav.appendChild(btnNext);

    container.appendChild(nav);

    const calendar = getCalendar(idx);
    container.appendChild(calendar);

    btnPrev.addEventListener("click", () => {
        for (let child of container.children) {
            if (child.classList.contains("calendar-body")) {
                container.removeChild(child);
            }
        }
        const newChild = getCalendar(--idx);
        container.appendChild(newChild);
        const fakeDate = `2024-${idx}-1`;
        month.textContent = dayjs(fakeDate).format("MMM").toUpperCase();
    });

    btnNext.addEventListener("click", () => {
        for (let child of container.children) {
            if (child.classList.contains("calendar-body")) {
                container.removeChild(child);
            }
        }
        const newChild = getCalendar(++idx);
        container.appendChild(newChild);
        const fakeDate = `2024-${idx}-1`;
        month.textContent = dayjs(fakeDate).format("MMM").toUpperCase();
    });

    return container;
}

function getCalendar(monthIndex) {
    const body = document.createElement("div");
    body.className =
        "calendar-body w-full grid grid-cols-1 gap-px xl:grid-cols-7";

    const dates = Calendar.getMonthDisplay(monthIndex);
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
            "ml-2 mb-6 text-2xl font-medium w-12 h-12 flex items-center justify-center";

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

    return body;
}
