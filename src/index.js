import "./style.css";
import { isSameDay } from "date-fns";
import dayjs from "dayjs";

import Task, { TaskList } from "./components/Task";
import Calendar from "./components/Calendar";
import Landing from "./components/Landing";
import TaskView from "./components/TaskView";

function updateUICallback() {
    observer.disconnect();
    console.log("callback triggered!");
    while (root.firstChild) root.removeChild(root.firstChild);
    const taskDisplay = TaskView();
    root.appendChild(taskDisplay);
    observer.observe(taskDisplay, config);
}

let observer = new MutationObserver(updateUICallback);

const root = document.querySelector("#root");

const landingPage = Landing();
const taskDisplay = TaskView();
root.appendChild(landingPage);
root.appendChild(taskDisplay);

if (TaskList.get().length === 0) taskDisplay.style.display = "none";
else landingPage.style.display = "none";

const config = { childList: true };
observer.observe(taskDisplay, config);

// console.log(Calendar.getDate("2024-04-19"));

// console.log(TaskList.get());

// const date = dayjs().format("YYYY-MM-DD");
// const dateObject = dayjs(date);
// console.log(date);
// console.log(dateObject.date());

// TaskList.importFakeTasks();

// console.log(Calendar.getMonth(3));
// console.log(Calendar.getWeekDisplay(0));

// console.log(dayjs("2024-1-1").month());

// Calendar.save();

// console.log(dayjs.unix(1719340200000 / 1000).format());
