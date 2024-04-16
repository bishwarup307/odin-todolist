import { ProjectList } from "./Project";
import { TaskList } from "./Task";

let selected;

export default function ProjectView() {
    const projects = ProjectList.getAllProjects();

    const container = document.createElement("div");
    container.className = "task-container mt-16 xl:flex";

    const mobileNav = document.createElement("div");
    mobileNav.className =
        "mb-4 bg-gradient-to-r from-textPrimary to-textPrimaryLight px-6 py-2 text-xl text-white rounded-lg flex items-center justify-center shadow-lg xl:hidden";

    const currentProject = document.createElement("p");
    currentProject.className = "text-white text-lg font-medium mr-auto";
    currentProject.textContent = selected
        ? selected.dataset.name
        : projects[0].name;
    mobileNav.appendChild(currentProject);

    const btnShowNav = document.createElement("button");
    btnShowNav.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="#ebebeb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
    btnShowNav.className = " stroke-white fill-white w-10";
    mobileNav.appendChild(btnShowNav);

    btnShowNav.addEventListener("click", () => {
        if (sidebar.classList.contains("hidden")) {
            sidebar.classList.remove("hidden");
            sidebar.classList.add("flex");
        } else {
            sidebar.classList.remove("flex");
            sidebar.classList.add("hidden");
        }
    });

    container.appendChild(mobileNav);

    const sidebar = document.createElement("div");
    sidebar.className = "hidden flex-col xl:flex xl:min-w-64 xl:mr-16";

    projects.forEach((project) => {
        const projectBtn = document.createElement("button");
        projectBtn.className =
            "project-nav-btn flex items-center justify-center px-4 py-2 rounded-lg bg-textPrimary border-b-[1px] border-bgExtraLight text-white transition-all duration-300 xl:rounded-none xl:bg-white xl:text-textPrimary xl:font-medium xl:justify-start";

        if (selected) {
            if (project.id === selected.id) {
                selected = projectBtn;
            }
        } else {
            if (project.name === "default") {
                selected = projectBtn;
            }
        }
        selected.classList.add("active");

        projectBtn.textContent = project.name;
        projectBtn.id = project.id;
        projectBtn.dataset.name = project.name;
        sidebar.appendChild(projectBtn);

        projectBtn.addEventListener("click", () => {
            selected.classList.remove("active");
            selected = projectBtn;
            selected.classList.add("active");

            for (let child of container.children) {
                if (child.id === "projectview-task-container")
                    container.removeChild(child);
            }
            container.appendChild(displayTasks(projectBtn.id));
            currentProject.textContent = project.name;
            sidebar.classList.add("hidden");
        });
    });

    container.appendChild(sidebar);
    container.appendChild(displayTasks(selected.id));
    return container;
}

function displayTasks(projectId) {
    const taskContainer = document.createElement("div");
    taskContainer.className =
        "grid grid-cols-1 gap-y-8 items-start xl:grid-cols-3 xl:gap-x-12";
    taskContainer.id = "projectview-task-container";
    const myTasks = TaskList.getByProject(projectId);

    myTasks.forEach((task) => {
        taskContainer.appendChild(task.displayTask());
    });
    return taskContainer;
}
