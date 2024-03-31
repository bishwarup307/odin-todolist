import "./style.css";
import { isSameDay } from "date-fns";
import dayjs from "dayjs";

import Task, { TaskList } from "./components/Task";

const myDiv = document.createElement("div");
myDiv.textContent = "Tailwind Starter";

[
    "text-6xl",
    "text-textPrimary",
    "flex",
    "justify-center",
    "mt-8",
    "font-albert",
    "font-bold",
].forEach((cls) => myDiv.classList.add(cls));

const root = document.querySelector("#root");
root.appendChild(myDiv);

// const date = dayjs().format("YYYY-MM-DD");
// const dateObject = dayjs(date);
// console.log(date);
// console.log(dateObject.date());

TaskList.importFakeTasks();
