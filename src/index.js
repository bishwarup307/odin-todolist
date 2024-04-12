import "./style.css";
import { isSameDay } from "date-fns";
import dayjs from "dayjs";

import Task, { TaskList } from "./components/Task";
import Calendar from "./components/Calendar";
import Landing from "./components/Landing";
import TaskView from "./components/TaskView";
import View from "./components/View";

function updateUICallback() {
    observer.disconnect();
    console.log("callback to update UI triggered!");
    while (root.firstChild) root.removeChild(root.firstChild);

    // remove datepicker divs floating around in the DOM
    // const datepickers = document.querySelectorAll(".datepicker");
    // datepickers.forEach((dp) => {
    //     document.body.removeChild(dp);
    // });

    const taskDisplay = View();
    root.appendChild(taskDisplay.container);
    observer.observe(taskDisplay.taskView, config);
}

let observer = new MutationObserver(updateUICallback);

const root = document.querySelector("#root");

const taskDisplay = View();
const landingPage = Landing();
root.appendChild(landingPage);
root.appendChild(taskDisplay.container);

if (TaskList.get().length === 0) taskDisplay.container.style.display = "none";
else landingPage.style.display = "none";

const config = { childList: true };
observer.observe(taskDisplay.taskView, config);

// console.log(Calendar.getDate("2024-04-19"));

// console.log(TaskList.get());

// const date = dayjs().isSame("2024-4-11", "day");
// console.log(date);
// const dateObject = dayjs(date);
// console.log(date);
// console.log(dateObject.date());

// TaskList.importFakeTasks();

// console.log(Calendar.getMonth(3));
// console.log(Calendar.getWeekDisplay(0));

// console.log(dayjs("2024-1-1").month());

// Calendar.save();

// console.log(dayjs.unix(1719340200000 / 1000).format());
