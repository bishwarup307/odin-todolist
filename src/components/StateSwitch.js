let active;

export default function StateSwitch() {
    const switchContainer = document.createElement("div");
    switchContainer.className = "relative flex items-center gap-3 mt-3";

    const todo = document.createElement("button");
    todo.id = "todo";
    todo.className =
        "relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    todo.dataset.tooltip = "To-do";
    todo.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
    switchContainer.appendChild(todo);

    const doing = document.createElement("button");
    doing.id = "doing";
    doing.className =
        "relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    doing.dataset.tooltip = "In progress";
    doing.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path> </g></svg>`;
    switchContainer.appendChild(doing);

    const done = document.createElement("button");
    done.id = "done";
    done.className =
        "relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    done.dataset.tooltip = "Done";
    done.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="m19.862 4.314-7.055-2.16c-.527-.206-1.159-.206-1.79 0l-6.95 2.16C2.593 4.724 1.75 6.062 2.066 7.5l1.158 6.17c.527 2.879 2.001 5.141 4.212 6.478 2.001 1.234 3.475 1.85 4.634 1.85 1.158 0 2.632-.616 4.633-1.85 2.211-1.337 3.686-3.599 4.212-6.478l1.053-6.17c.21-1.44-.632-2.776-2.106-3.187ZM15.65 10.38l-4.212 4.113c-.21.103-.316.206-.527.206a.815.815 0 0 1-.526-.206l-2.106-2.056a.793.793 0 0 1 0-1.131.84.84 0 0 1 1.158 0l1.58 1.542 3.685-3.599a.84.84 0 0 1 1.159 0c.105.412.105.823-.211 1.131Z"/>
</svg>`;
    switchContainer.appendChild(done);

    const lineDiv = document.createElement("div");
    lineDiv.className =
        "absolute left-0 w-24 top-[50%] bg-gray-300 h-[2px] -z-10";
    switchContainer.appendChild(lineDiv);
    return switchContainer;
}
// active = todo;
// switchContainer.addEventListener("click", (e) => {
//     const target = e.target.closest("button");
//     if (!target) return;

//     if (active.id === target.id) return;

//     active.classList.remove("active");
//     active = document.querySelector(`#${target.id}`);
//     active.classList.add("active");
// });
