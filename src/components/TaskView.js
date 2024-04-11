import Task, { TaskList } from "./Task";
import util from "./Utilities";

export default function TaskView() {
    const container = document.createElement("div");
    container.id = "task-view-container";
    // container.className = "w-full";

    const taskDisplay = document.createElement("section");
    taskDisplay.className =
        "grid grid-cols-1 xl:grid-cols-3 xl:gap-x-20 dxl:gap-x-24";

    ["to-do", "doing", "done"].forEach((state) => {
        const tasks = TaskList.getByStatus(state);
        const taskContainer = document.createElement("div");
        taskContainer.className = "flex flex-col gap-8 mt-16";
        const heading = document.createElement("h2");
        heading.textContent = util.toTitleCase(state);
        heading.className =
            "bg-gradient-to-r from-textPrimary to-textPrimaryLight px-6 py-2 text-xl text-white rounded-lg flex items-center justify-center shadow-lg";
        taskContainer.appendChild(heading);

        tasks.forEach((task) => {
            taskContainer.appendChild(task.displayTask());
        });

        taskDisplay.appendChild(taskContainer);
    });

    container.appendChild(taskDisplay);
    return container;
}
