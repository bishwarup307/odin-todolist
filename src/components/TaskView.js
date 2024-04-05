import Task, { TaskList } from "./Task";

export default function TaskView() {
    const container = document.createElement("div");
    container.className =
        "max-w-sm mx-auto flex flex-col gap-8 md:max-w-md lg:max-w-xl";

    for (let task of TaskList.get()) container.appendChild(task.displayTask());

    return container;
}
