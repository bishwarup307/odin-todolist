import { ProjectList } from "./Project";

let selected;

export default function ProjectView() {
    const projects = ProjectList.getAllProjects();

    const container = document.createElement("div");
    container.className = "task-container mt-16";

    const mobileNav = document.createElement("div");
    mobileNav.className =
        "mb-4 bg-gradient-to-r from-textPrimary to-textPrimaryLight px-6 py-2 text-xl text-white rounded-lg flex items-center justify-center shadow-lg";

    const currentProject = document.createElement("p");
    currentProject.className = "text-white text-lg font-medium mr-auto";
    currentProject.textContent = projects[0].name;
    mobileNav.appendChild(currentProject);

    const btnShowNav = document.createElement("button");
    btnShowNav.innerHTML = `<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Align-Left</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Align-Left"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="5" y1="6" x2="19" y2="6" id="Path" stroke="#dedede" stroke-width="2" stroke-linecap="round"> </line> <line x1="5" y1="14" x2="19" y2="14" id="Path" stroke="#dedede" stroke-width="2" stroke-linecap="round"> </line> <line x1="5" y1="10" x2="13" y2="10" id="Path" stroke="#dedede" stroke-width="2" stroke-linecap="round"> </line> <line x1="5" y1="18" x2="13" y2="18" id="Path" stroke="#dedede" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g></svg>`;
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
    sidebar.className = "hidden flex-col";

    projects.forEach((project) => {
        const projectBtn = document.createElement("button");
        projectBtn.className =
            "project-nav-btn flex items-center justify-center px-4 py-2 rounded-lg bg-textPrimary border-b-[1px] border-bgExtraLight text-white transition-all duration-300";
        if (project.name === "default") {
            selected = projectBtn;
            projectBtn.classList.add("active");
        }
        projectBtn.textContent = project.name;
        projectBtn.dataset.name = project.name;
        sidebar.appendChild(projectBtn);

        projectBtn.addEventListener("click", () => {
            selected.classList.remove("active");
            selected = projectBtn;
            selected.classList.add("active");
        });
    });

    container.appendChild(sidebar);

    return container;
}
