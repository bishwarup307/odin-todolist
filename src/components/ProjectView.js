import Project, { ProjectList } from "./Project";
import { TaskList } from "./Task";
import util from "./Utilities";

let selected;

export default function ProjectView() {
    const projects = ProjectList.getAllProjects();

    const container = document.createElement("div");
    container.className = "task-container mt-16 xl:flex";

    const btnAdd1 = AddProjectBtn();
    container.appendChild(btnAdd1);
    btnAdd1.classList.add("xl:hidden");

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

    const btnAdd2 = AddProjectBtn();
    // btnAdd2.className = "hidden xl:flex";
    btnAdd2.classList.add("hidden");
    btnAdd2.classList.add("xl:flex");
    btnAdd2.classList.add("xl:mb-12");
    sidebar.appendChild(btnAdd2);

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

    const addProjectModal = AddProjectModal();
    container.appendChild(addProjectModal);

    btnAdd1.addEventListener("click", () => {
        addProjectModal.showModal();
    });

    btnAdd2.addEventListener("click", () => {
        addProjectModal.showModal();
    });

    return container;
}

function displayTasks(projectId) {
    const taskContainer = document.createElement("div");
    taskContainer.className =
        "flex-1 grid grid-cols-1 gap-y-8 items-start xl:grid-cols-2 xl:gap-x-12 dxl:grid-cols-3";
    taskContainer.id = "projectview-task-container";
    const myTasks = TaskList.getByProject(projectId);

    myTasks.forEach((task) => {
        taskContainer.appendChild(task.displayTask());
    });
    return taskContainer;
}

function AddProjectBtn() {
    const btnAddProject = document.createElement("button");
    btnAddProject.className =
        "mb-4 flex justify-between items-center bg-black shadow-md px-4 py-2 w-full rounded-lg";

    const btnText = document.createElement("p");
    btnText.textContent = "New Project";
    btnText.className = "font-medium text-white text-lg";
    btnAddProject.appendChild(btnText);

    const btnIcon = document.createElement("div");
    btnIcon.className = "w-8";
    btnIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f2f2f2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#f2f2f2" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#f2f2f2" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`;
    btnAddProject.appendChild(btnIcon);

    return btnAddProject;
}

function AddProjectModal() {
    const modal = document.createElement("dialog");
    modal.className =
        "w-full px-8 py-8 rounded-lg shadow-sm shadow-white backdrop:bg-black/50 max-w-sm lg:max-w-md xl:max-w-lg";

    const container = document.createElement("div");
    container.className =
        "grid grid-cols-[100px_auto] gap-x-4 gap-y-8 items-center";

    const labelName = document.createElement("p");
    labelName.textContent = "Name";
    container.appendChild(labelName);

    const nameDiv = document.createElement("div");
    nameDiv.className = "relative";
    const name = document.createElement("input");
    name.placeholder = "Choose a name for your project";
    name.className =
        "w-full border-black rounded-lg border-2 px-1 py-2 text-md placeholder:text-sm focus:outline-none";
    nameDiv.appendChild(name);
    const nameValidation = document.createElement("p");
    nameValidation.textContent = "";
    nameValidation.className = "absolute text-xs text-red-500";
    nameDiv.appendChild(nameValidation);
    container.appendChild(nameDiv);

    const labelDescription = document.createElement("p");
    labelDescription.textContent = "Description";
    container.appendChild(labelDescription);

    const description = document.createElement("textarea");
    description.placeholder = "Add a brief description...";
    description.className =
        "border-black rounded-lg border-2 px-1 py-2 text-md placeholder:text-sm resize-none focus:outline-none";
    container.appendChild(description);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Create Project";
    addBtn.className =
        "rounded-lg bg-black font-medium text-white px-4 py-2 shadow-md flex justify-center items-center col-span-2 self-end";
    container.appendChild(addBtn);

    addBtn.addEventListener("click", () => {
        if (!name.value) {
            nameValidation.textContent = "Please enter a name for your project";
        }
        ProjectList.add(new Project(name.value, description.value));
        util.updateUIHack();
        modal.close();
    });
    modal.appendChild(container);

    return modal;
}
