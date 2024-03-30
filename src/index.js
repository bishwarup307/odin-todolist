import "./style.css";

import Task from "./components/Task";

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
