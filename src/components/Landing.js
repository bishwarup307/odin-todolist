import Logo from "../assets/logo-color.png";
import AddTask from "./AddTask";

export default function Landing() {
    let classNames;

    const parentContainer = document.createElement("div");
    parentContainer.className = "bg-hero bg-cover bg-center";

    // container for content
    const container = document.createElement("div");
    container.className =
        "flex flex-col h-lvh items-center justify-start mx-auto px-8 gap-8 bg-white/50 backdrop-blur-sm lg:flex-row lg:max-w-7xl";

    // Logo
    const logoContainer = document.createElement("div");
    logoContainer.className =
        "flex flex-col justify-center items-center mt-16 lg:mt-0";

    const logo = document.createElement("img");
    classNames = "w-80";
    logo.src = Logo;
    classNames.split(" ").forEach((cls) => {
        logo.classList.add(cls);
    });
    logoContainer.appendChild(logo);

    const logoText = document.createElement("p");
    logoText.className =
        "text-2xl text-center mt-8 text-textPrimaryLight letter-tighter lg:font-medium";
    logoText.textContent =
        "Capture tasks, conquer chaos. Your productivity powerhouse awaits.";

    logoContainer.appendChild(logoText);

    const gotoTaskBtn = document.createElement("button");
    gotoTaskBtn.className =
        "mt-8 rounded-full border-2 border-transparent bg-bgPrimary font-medium py-2 px-8 text-xl text-white transition hover:bg-white hover:text-bgPrimary hover:border-bgPrimary";
    gotoTaskBtn.textContent = "Go to My Tasks";
    logoContainer.appendChild(gotoTaskBtn);

    container.appendChild(logoContainer);

    const addTaskContainer = document.createElement("div");
    addTaskContainer.className = "flex flex-col gap-4 w-full items-end";

    addTaskContainer.appendChild(AddTask());

    const importTask = document.createElement("p");
    importTask.className = "text-sm lg:text-base";
    importTask.innerHTML = `Not sure? <span id='import-task' class='underline cursor-pointer text-amber-600 font-bold import-task'>Import model tasks </span> to get started and edit them on the fly.`;

    addTaskContainer.appendChild(importTask);
    container.appendChild(addTaskContainer);

    parentContainer.appendChild(container);
    return parentContainer;
}
