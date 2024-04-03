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

    classNames = "text-2xl text-center mt-8 letter-tighter";
    const logoText = document.createElement("p");
    logoText.textContent =
        "Capture tasks, conquer chaos. Your productivity powerhouse awaits.";
    classNames.split(" ").forEach((cls) => {
        logoText.classList.add(cls);
    });
    logoContainer.appendChild(logoText);

    classNames =
        "mt-8 rounded-full border-2 border-transparent bg-bgPrimary font-medium py-2 px-8 text-xl text-white transition hover:bg-white hover:text-bgPrimary hover:border-bgPrimary";
    const gotoTaskBtn = document.createElement("button");
    gotoTaskBtn.textContent = "Go to My Tasks";
    classNames.split(" ").forEach((cls) => {
        gotoTaskBtn.classList.add(cls);
    });
    logoContainer.appendChild(gotoTaskBtn);

    container.appendChild(logoContainer);

    container.appendChild(AddTask());

    parentContainer.appendChild(container);
    return parentContainer;
}
