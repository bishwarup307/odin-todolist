import AddTask from "./AddTask";
import TaskView from "./TaskView";
import CalendarView from "./CalendarView";
import ProjectView from "./ProjectView";
import logoPng from "../assets/logo-white.png";

export default function View() {
    let activeViewIndex = 0;

    function renderTasks() {
        console.log(`Active View: ${activeViewIndex}`);

        staticView.addTaskContainer.appendChild(AddTask);

        while (staticView.displayContainer.firstChild)
            staticView.displayContainer.removeChild(
                staticView.displayContainer.firstChild
            );
        let activeView;
        if (activeViewIndex === 0) activeView = TaskView();
        else if (activeViewIndex === 1) activeView = CalendarView();
        else if (activeViewIndex === 2) activeView = ProjectView();
        console.log(activeView);
        staticView.displayContainer.appendChild(activeView);
    }

    function SwitchViewTab() {
        const switchViewBarComponent = document.createElement("div");
        switchViewBarComponent.className =
            "relative w-full max-w-sm mt-16 flex gap-2 px-4 pt-2 border-b-2 bg-textPrimaryLightest border-textPrimary lg:max-w-2xl xl:max-w-7xl dxl:max-w-[1536px]";

        const btnSwitchTaskView = document.createElement("button");
        // taskView.id = "task-view"
        btnSwitchTaskView.className =
            "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
        btnSwitchTaskView.textContent = "Task view";
        switchViewBarComponent.appendChild(btnSwitchTaskView);

        const btnSwitchCalendarView = document.createElement("button");
        // calendarView.id = "calendar-view"
        btnSwitchCalendarView.className =
            "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
        btnSwitchCalendarView.textContent = "Calendar View";
        switchViewBarComponent.appendChild(btnSwitchCalendarView);

        const btnSwitchProjectView = document.createElement("button");
        // projectView.id = "project-view"
        btnSwitchProjectView.className =
            "view-tab rounded-t-2xl py-2 px-4 flex justify-center items-center bg-textPrimary text-white";
        btnSwitchProjectView.textContent = "Project View";
        switchViewBarComponent.appendChild(btnSwitchProjectView);

        let active;
        if (activeViewIndex === 0) active = btnSwitchTaskView;
        else if (activeViewIndex === 1) active = btnSwitchCalendarView;
        else if (activeViewIndex === 2) active = btnSwitchProjectView;
        active.classList.add("active");

        switchViewBarComponent.addEventListener("click", (e) => {
            const target = e.target.closest("button");

            if (!target) return;
            if (target === active) return;

            active.classList.remove("active");
            active = target;
            active.classList.add("active");
            // while (displayContainer.firstChild)
            //     staticView.displayContainer.removeChild(statdisplayContainer.firstChild);
            if (active === btnSwitchTaskView) {
                // displayContainer.appendChild(TaskView());
                activeViewIndex = 0;
            } else if (active === btnSwitchCalendarView) {
                // displayContainer.appendChild(CalendarView());
                activeViewIndex = 1;
            } else if (active === btnSwitchProjectView) {
                // displayContainer.appendChild(ProjectView());
                activeViewIndex = 2;
            }
            renderTasks();
        });

        return switchViewBarComponent;
    }

    const staticView = (function getStaticComponent() {
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

        // addTaskContainer.appendChild(AddTask);
        container.appendChild(addTaskContainer);

        const displayContainer = document.createElement("div");
        displayContainer.className =
            "w-full max-w-sm lg:max-w-2xl xl:max-w-7xl dxl:max-w-[1536px]";

        container.appendChild(SwitchViewTab());

        container.appendChild(displayContainer);

        return { container, displayContainer, addTaskContainer };
    })();

    function renderView() {
        renderTasks();
        return staticView.container;
    }
    return { renderView };
}
