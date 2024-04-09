export default function StateSwitch(task) {
    let active;

    const switchContainer = document.createElement("div");
    switchContainer.className = "relative flex items-center gap-3 mt-3";

    const todo = document.createElement("button");
    todo.id = "to-do";
    todo.className =
        "state-icon relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    todo.dataset.tooltip = "To-do";
    todo.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM17.5 13.5C18.0523 13.5 18.5 13.0523 18.5 12.5V11.5C18.5 10.9477 18.0523 10.5 17.5 10.5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H11.5C10.9477 3.5 10.5 3.94772 10.5 4.5V12.5C10.5 13.0523 10.9477 13.5 11.5 13.5H17.5Z"></path> </g></svg>`;
    switchContainer.appendChild(todo);

    const doing = document.createElement("button");
    doing.id = "doing";
    doing.className =
        "state-icon relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    doing.dataset.tooltip = "In progress";
    doing.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path> </g></svg>`;
    switchContainer.appendChild(doing);

    const done = document.createElement("button");
    done.id = "done";
    done.className =
        "state-icon relative w-6 h-6 fill-gray-400 stroke-gray-400 rounded-full border-2 border-gray-200 bg-gray-200 px-1 py-1";
    done.dataset.tooltip = "Done";
    done.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>`;
    switchContainer.appendChild(done);

    const lineDiv = document.createElement("div");
    lineDiv.className =
        "absolute left-0 w-24 top-[50%] bg-gray-300 h-[2px] -z-10";
    switchContainer.appendChild(lineDiv);

    if (task.status === "to-do") {
        active = todo;
        todo.classList.add("active");
    } else if (task.status === "doing") {
        active = doing;
        doing.classList.add("active");
    } else if (task.status === "done") {
        active = done;
        done.classList.add("active");
    }

    switchContainer.addEventListener("click", (e) => {
        const target = e.target.closest("button");
        if (!target) return;

        if (active.id === target.id) return;

        active.classList.remove("active");
        active = target;
        active.classList.add("active");
        task.update({ status: `${target.id}` });
    });

    return switchContainer;
}
