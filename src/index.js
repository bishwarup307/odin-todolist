import "./style.css";

import Task from "./components/Task";

const myDiv = document.createElement("div");
myDiv.textContent = "Tailwind Starter";

["text-4xl", "text-red-400", "flex", "justify-center", "mt-8"].forEach((cls) =>
    myDiv.classList.add(cls)
);

const root = document.querySelector("#root");
root.appendChild(myDiv);
