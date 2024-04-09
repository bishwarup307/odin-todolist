import Task, { TaskList } from "./Task";
import util from "./Utilities";

export default function TaskView() {
    const container = document.createElement("div");
    container.id = "task-view-container";
    container.className = "max-w-sm mx-auto md:max-w-md lg:max-w-xl";

    const taskDisplay = document.createElement("section");
    taskDisplay.className = "flex flex-col";

    ["to-do", "doing", "done"].forEach((state) => {
        const tasks = TaskList.getByStatus(state);
        const taskContainer = document.createElement("div");
        taskContainer.className = "flex flex-col gap-8";
        const heading = document.createElement("h2");
        heading.textContent = util.toTitleCase(state);
        heading.className =
            "bg-black px-6 py-2 text-xl text-white rounded-lg flex items-center justify-center";
        taskContainer.appendChild(heading);

        tasks.forEach((task) => {
            taskContainer.appendChild(task.displayTask());
        });

        taskDisplay.appendChild(taskContainer);
    });

    // for (let task of TaskList.get()) container.appendChild(task.displayTask());
    container.appendChild(taskDisplay);
    return container;
}
