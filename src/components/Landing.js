import Logo from "../assets/logo-color.png";
import AddTask from "./AddTask";

export default function Landing() {
    let classNames;

    // container for content
    classNames = "flex flex-col items-center justify-center mx-auto px-16";
    const container = document.createElement("div");
    classNames.split(" ").forEach((cls) => container.classList.add(cls));

    // Logo
    const logoContainer = document.createElement("div");
    classNames = "flex flex-col justify-center items-center mt-16";
    classNames.split(" ").forEach((cls) => {
        logoContainer.classList.add(cls);
    });

    const logo = document.createElement("img");
    classNames = "w-80";
    logo.src = Logo;
    classNames.split(" ").forEach((cls) => {
        logo.classList.add(cls);
    });
    logoContainer.appendChild(logo);

    classNames = "text-3xl text-center mt-8";
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

    return container;
}
