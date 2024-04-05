import "./style.css";
import { isSameDay } from "date-fns";
import dayjs from "dayjs";

import Task, { TaskList } from "./components/Task";
import Calendar from "./components/Calendar";
import Landing from "./components/Landing";
import TaskView from "./components/TaskView";

// const myDiv = document.createElement("div");
// myDiv.textContent = "Tailwind Starter";

// [
//     "text-6xl",
//     "text-textPrimary",
//     "flex",
//     "justify-center",
//     "mt-8",
//     "font-albert",
//     "font-bold",
// ].forEach((cls) => myDiv.classList.add(cls));

const root = document.querySelector("#root");

const landingPage = Landing();
// landingPage.style.display = "none";
root.appendChild(landingPage);

// console.log(TaskList.get()[0]);
// root.appendChild(TaskView());

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
