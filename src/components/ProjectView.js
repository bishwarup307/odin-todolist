import Project, { ProjectList } from "./Project";
import { TaskList } from "./Task";
import util from "./Utilities";

let selected;

export default function ProjectView() {
    const projects = ProjectList.getAllProjects();

    const container = document.createElement("div");
    container.className = "task-container mt-16 xl:flex";

    const searchDiv = document.createElement("div");
    searchDiv.className = "relative";
    const searchInput = document.createElement("input");
    searchInput.className =
        "mb-2 rounded-full bg-slate-100 w-full px-4 py-2 border-black border-[1px] shadow-slate-100 shadow-md text-md placeholder:text-sm focus:outline-none focus:bg-white focus:border-2";
    searchInput.placeholder = "Search project";
    searchDiv.appendChild(searchInput);

    searchInput.addEventListener("input", () => {
        // console.log("fired");
        updateSidebar(searchInput.value);
    });

    const searchIcon = document.createElement("div");
    searchIcon.innerHTML = `<svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.132 9.71395C10.139 11.2496 10.3328 13.2665 11.6 14.585C12.8468 15.885 14.8527 16.0883 16.335 15.065C16.6466 14.8505 16.9244 14.5906 17.159 14.294C17.3897 14.0023 17.5773 13.679 17.716 13.334C18.0006 12.6253 18.0742 11.8495 17.928 11.1C17.7841 10.3573 17.4268 9.67277 16.9 9.12995C16.3811 8.59347 15.7128 8.22552 14.982 8.07395C14.2541 7.92522 13.4982 8.00197 12.815 8.29395C12.1254 8.58951 11.5394 9.08388 11.132 9.71395Z" stroke="#cfcfcf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.5986 13.6868C17.2639 13.4428 16.7947 13.5165 16.5508 13.8513C16.3069 14.1861 16.3806 14.6552 16.7154 14.8991L17.5986 13.6868ZM19.0584 16.6061C19.3931 16.85 19.8623 16.7764 20.1062 16.4416C20.3501 16.1068 20.2764 15.6377 19.9416 15.3938L19.0584 16.6061ZM7.5 12.7499C7.91421 12.7499 8.25 12.4142 8.25 11.9999C8.25 11.5857 7.91421 11.2499 7.5 11.2499V12.7499ZM5.5 11.2499C5.08579 11.2499 4.75 11.5857 4.75 11.9999C4.75 12.4142 5.08579 12.7499 5.5 12.7499V11.2499ZM7.5 15.7499C7.91421 15.7499 8.25 15.4142 8.25 14.9999C8.25 14.5857 7.91421 14.2499 7.5 14.2499V15.7499ZM5.5 14.2499C5.08579 14.2499 4.75 14.5857 4.75 14.9999C4.75 15.4142 5.08579 15.7499 5.5 15.7499V14.2499ZM8.5 9.74994C8.91421 9.74994 9.25 9.41415 9.25 8.99994C9.25 8.58573 8.91421 8.24994 8.5 8.24994V9.74994ZM5.5 8.24994C5.08579 8.24994 4.75 8.58573 4.75 8.99994C4.75 9.41415 5.08579 9.74994 5.5 9.74994V8.24994ZM16.7154 14.8991L19.0584 16.6061L19.9416 15.3938L17.5986 13.6868L16.7154 14.8991ZM7.5 11.2499H5.5V12.7499H7.5V11.2499ZM7.5 14.2499H5.5V15.7499H7.5V14.2499ZM8.5 8.24994H5.5V9.74994H8.5V8.24994Z" fill="#cfcfcf"></path> </g></svg>`;
    searchIcon.className = "absolute w-10 top-0 right-2";
    searchDiv.appendChild(searchIcon);

    // container.appendChild(searchDiv);

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

    sidebar.appendChild(searchDiv);

    const btnAdd2 = AddProjectBtn();
    btnAdd2.classList.add("hidden");
    btnAdd2.classList.add("xl:flex");
    btnAdd2.classList.add("xl:mb-12");
    sidebar.appendChild(btnAdd2);

    function updateSidebar(searchTerm) {
        console.log(sidebar.children.length);

        [...sidebar.children].forEach((btn) => {
            if (btn.classList.contains("project-nav-btn")) {
                console.log(`removing ${btn.dataset.name}`);
                sidebar.removeChild(btn);
            }
        });

        let renderProjects = [];
        if (searchTerm) {
            renderProjects = projects.filter((item) => {
                const searchFor = util.processString(searchTerm);
                return util.processString(item.name).match(searchFor);
            });
        } else renderProjects = projects;
        console.log(renderProjects.length);

        renderProjects.forEach((project) => {
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
                    if (child.id === "project-view-task-container")
                        container.removeChild(child);
                }
                container.appendChild(displayTasks(projectBtn.id));
                currentProject.textContent = project.name;
                sidebar.classList.add("hidden");
            });
        });
    }
    updateSidebar();
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
    taskContainer.id = "project-view-task-container";
    const myTasks = TaskList.getByProject(projectId);

    myTasks.forEach((task) => {
        taskContainer.appendChild(task.displayTask());
    });
    return taskContainer;
}

export function AddProjectBtn(type) {
    const btnAddProject = document.createElement("button");
    btnAddProject.className =
        "mb-4 flex justify-between items-center bg-black shadow-md px-4 py-2 w-full rounded-lg";

    const btnText = document.createElement("p");
    btnText.textContent = "New Project";
    btnText.className = "font-medium text-white text-lg btn-add-project-text";
    btnAddProject.appendChild(btnText);

    if (type === "small") {
        btnAddProject.classList.remove("mb-4");
        btnAddProject.classList.remove("py-2");
        btnAddProject.classList.add("py-1");
        btnAddProject.classList.remove("px-4");
        btnAddProject.classList.add("px-1");
        btnAddProject.classList.add("gap-1");
        btnAddProject.classList.remove("rounded-lg");
        btnAddProject.classList.add("rounded-full");
        btnText.classList.remove("text-lg");
        btnText.classList.add("text-base");
        btnText.classList.add("hidden");
        // btnText.classList.add("scale-0");
        btnAddProject.classList.add("btn-add-project-small");
    }

    const btnIcon = document.createElement("div");
    btnIcon.className = "w-8";
    btnIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f2f2f2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#f2f2f2" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#f2f2f2" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`;
    btnAddProject.appendChild(btnIcon);

    return btnAddProject;
}

export function AddProjectModal() {
    const modal = document.createElement("dialog");
    modal.className =
        "w-full px-8 py-8 rounded-lg shadow-sm shadow-white backdrop:bg-black/50 max-w-sm lg:max-w-md xl:max-w-lg";

    const container = document.createElement("div");
    container.className =
        "grid grid-cols-[100px_auto] gap-x-4 gap-y-4 items-start";

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
        // util.updateUIHack();
        modal.close();
    });
    modal.appendChild(container);

    return modal;
}
