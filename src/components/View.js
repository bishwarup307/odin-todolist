import AddTask from "./AddTask";
import TaskView from "./TaskView";
import CalendarView from "./CalendarView";
import ProjectView from "./ProjectView";
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

    addTaskContainer.appendChild(AddTask);
    container.appendChild(addTaskContainer);

    const displayContainer = document.createElement("div");
    displayContainer.className =
        "w-full max-w-sm lg:max-w-2xl xl:max-w-7xl dxl:max-w-[1536px]";

    const taskView = TaskView();
    const calendarView = CalendarView();
    const projectView = ProjectView();

    container.appendChild(
        SwitchViewTab(displayContainer, taskView, calendarView, projectView)
    );
    displayContainer.appendChild(taskView);
    container.appendChild(displayContainer);

    return container;
}

function SwitchViewTab(viewEl, taskViewEl, calendarViewEl, projectViewEl) {
    const container = document.createElement("div");
    container.className =
        "relative w-full max-w-sm mt-16 flex gap-2 px-4 pt-2 border-b-2 bg-textPrimaryLightest border-textPrimary lg:max-w-2xl xl:max-w-7xl dxl:max-w-[1536px]";

    const taskView = document.createElement("button");
    // taskView.id = "task-view"
    taskView.className =
        "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
    taskView.textContent = "Task view";
    container.appendChild(taskView);

    const calendarView = document.createElement("button");
    // calendarView.id = "calendar-view"
    calendarView.className =
        "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
    calendarView.textContent = "Calendar View";
    container.appendChild(calendarView);

    const projectView = document.createElement("button");
    // projectView.id = "project-view"
    projectView.className =
        "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
    projectView.textContent = "Project View";
    container.appendChild(projectView);

    let active = taskView;
    active.classList.add("active");

    container.addEventListener("click", (e) => {
        const target = e.target.closest("button");

        if (!target) return;
        if (target === active) return;

        active.classList.remove("active");
        active = target;
        active.classList.add("active");
        while (viewEl.firstChild) viewEl.removeChild(viewEl.firstChild);
        if (active === taskView) viewEl.appendChild(taskViewEl);
        else if (active === calendarView) viewEl.appendChild(calendarViewEl);
        else if (active === projectView) viewEl.appendChild(projectViewEl);
    });

    return container;
}
