import AddTask from "./AddTask";
import TaskView from "./TaskView";
import logoPng from "../assets/logo-white.png";

export default function View() {
    const container = document.createElement("div");
    container.className = "grid place-items-center";

    const navbarContainer = document.createElement("div");
    navbarContainer.className =
        "w-full bg-grad py-6 mb-16 bg-gradient-to-r from-textPrimary to-textPrimaryLight";

    const logoContainer = document.createElement("div");
    logoContainer.className =
        "max-w-sm mx-auto lg:max-w-2xl xl:max-w-7xl dxl:max-w-[1536px]";

    const logo = document.createElement("img");
    logo.src = logoPng;
    logo.className = "h-12";
    logoContainer.appendChild(logo);
    navbarContainer.appendChild(logoContainer);
    container.appendChild(navbarContainer);

    const addTaskContainer = document.createElement("div");
    addTaskContainer.className =
        "w-full max-w-sm lg:max-w-xl xl:max-w-3xl dxl:max-w-4xl";

    addTaskContainer.appendChild(AddTask());
    container.appendChild(addTaskContainer);

    const taskView = TaskView();
    container.appendChild(taskView);

    return { container, taskView };
}
