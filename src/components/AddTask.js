import dayjs from "dayjs";
import "flowbite";
import Datepicker from "flowbite-datepicker/Datepicker";
import Task, { TaskList, VALID_CATEGORIES, VALID_PRIORITIES } from "./Task";
import util from "./Utilities";

const AddTask = (function addNewTask() {
    const container = document.createElement("div");
    container.className =
        "flex flex-col gap-2 w-full rounded-2xl border-gray-400 px-4 py-4 shadow-lg bg-white bg-opacity-90";

    // input field for task
    const taskInput = document.createElement("textarea");
    taskInput.id = "form-task-input";
    taskInput.placeholder = "Add a new task...";
    taskInput.className =
        "w-full h-32 resize-none border-none focus:outline-none active:border-none bg-white bg-opacity-10";
    container.appendChild(taskInput);

    // div for validation messages
    const formValidationDiv = document.createElement("div");
    formValidationDiv.className = "text-red-500 font-medium text-xs lg:text-sm";
    container.appendChild(formValidationDiv);

    // div for displaying tags entered by the user
    const tagDisplayContainer = document.createElement("div");
    tagDisplayContainer.className = "flex gap-1 flex-wrap";
    container.appendChild(tagDisplayContainer);

    tagDisplayContainer.addEventListener("click", (e) => {
        if (e.target.closest("button")) {
            if (e.target.closest("button").classList.contains("remove-btn")) {
                tagDisplayContainer.removeChild(e.target.closest("div"));
            }
        }
    });

    // container for category, tags, date and priority inputs
    const otherFieldsContainer = document.createElement("div");
    otherFieldsContainer.className = "flex gap-3 items-center flex-wrap";

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "flex gap-1 items-center";

    const categoryPicker = document.createElement("button");
    // categoryPicker.id = "btn-category-picker";
    categoryPicker.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z" fill="#292D32"></path> <path opacity="0.4" d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z" fill="#292D32"></path> <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" fill="#292D32"></path> <path d="M17.7099 21.9999C20.0792 21.9999 21.9999 20.0792 21.9999 17.7099C21.9999 15.3406 20.0792 13.4199 17.7099 13.4199C15.3406 13.4199 13.4199 15.3406 13.4199 17.7099C13.4199 20.0792 15.3406 21.9999 17.7099 21.9999Z" fill="#292D32"></path> </g></svg>`;
    categoryDiv.appendChild(categoryPicker);

    const categoryInput = makeInput("category", categoryPicker);
    categoryDiv.appendChild(categoryInput);
    otherFieldsContainer.appendChild(categoryDiv);

    const tagDiv = document.createElement("div");
    tagDiv.className = "flex gap-1 items-center";

    const tagPicker = document.createElement("button");
    tagPicker.id = "btn-tag-picker";
    tagPicker.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <g opacity="0.4"> <path d="M19 22V16L17 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 16L21 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <g opacity="0.4"> <path d="M9.95039 6.25977L8.90039 15.7298" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.1105 6.25977L12.0605 15.7298" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.5293 9.41992H15.9993" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12.5801H15.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
    tagDiv.appendChild(tagPicker);

    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.id = "form-tag-input";
    tagInput.placeholder = "Add a tag";
    tagInput.className =
        "w-28 py-1 hidden justify-center items-center border-2 rounded-full text-xs font-medium origin-bottom-left transition-width duration-500 px-4 focus:outline-none lg:w-32 lg:text-sm";
    tagDiv.appendChild(tagInput);
    otherFieldsContainer.appendChild(tagDiv);

    const dateDiv = document.createElement("div");
    dateDiv.className = "flex gap-1 items-center";

    const outerDiv = document.createElement("div");
    outerDiv.className = "relative max-w-sm";

    const innerDiv = document.createElement("div");
    innerDiv.className =
        "absolute left-0 -top-1 top- items-center pointer-events-none";

    innerDiv.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon-calendar" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z" fill="#1C274C"></path> <path opacity="0.2" d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z" fill="#1C274C"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path> </g></svg>`;

    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.id = "datepicker";
    dateInput.className =
        "w-6 rounded-full focus:outline-none focus:caret-transparent text-transparent";

    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(dateInput);

    dateDiv.appendChild(outerDiv);

    new Datepicker(dateInput, {
        autohide: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        minDate: new Date(),
    });

    const dateDisplay = document.createElement("div");
    dateDisplay.id = "form-date-display";
    dateDisplay.className =
        "hidden w-20 py-1 h-auto justify-center items-center bg-gray-200 rounded-full text-xs font-medium origin-bottom-left transition-width duration-500 lg:text-sm lg:w-24";
    dateDiv.appendChild(dateDisplay);
    otherFieldsContainer.appendChild(dateDiv);

    const priorityDiv = document.createElement("div");
    priorityDiv.className = "flex gap-1 items-center";
    const priorityPicker = document.createElement("button");
    priorityPicker.innerHTML = `<svg viewBox="0 0 24 24" width="36px" height="36px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5207 10.186C18.6221 10.0845 18.7883 10.0889 18.8809 10.1986C20.1907 11.7522 20.9398 13.7085 20.9965 15.7498C21.0003 15.8878 20.8881 15.9998 20.75 15.9998H16.2449C16.1069 15.9998 15.9957 15.8878 15.9871 15.75C15.9415 15.0221 15.6977 14.3235 15.2864 13.7284C15.2147 13.6247 15.2229 13.4838 15.3119 13.3947L18.5207 10.186ZM17.8008 9.11866C17.9106 9.21118 17.915 9.37738 17.8135 9.47887L14.6048 12.6876C14.5157 12.7767 14.3747 12.7848 14.2711 12.7132C13.8049 12.3911 13.2753 12.1717 12.7178 12.0699C12.5939 12.0473 12.5 11.9418 12.5 11.8158V7.278C12.5 7.13447 12.6206 7.02009 12.7636 7.03226C14.6177 7.19008 16.3782 7.91926 17.8008 9.11866ZM11.5 7.278C11.5 7.13447 11.3793 7.02009 11.2363 7.03226C9.38222 7.19008 7.62177 7.91926 6.1991 9.11868C6.08937 9.21119 6.08493 9.3774 6.18642 9.47888L9.39518 12.6876C9.48425 12.7767 9.62522 12.7848 9.72886 12.7132C10.195 12.3911 10.7247 12.1717 11.2821 12.0699C11.4061 12.0473 11.5 11.9418 11.5 11.8158V7.278ZM8.71361 13.7284C8.78524 13.6247 8.7771 13.4838 8.68802 13.3947L5.47929 10.186C5.37781 10.0845 5.21161 10.0889 5.11909 10.1986C3.80923 11.7522 3.06012 13.7085 3.00345 15.7498C2.99962 15.8878 3.11191 15.9998 3.24998 15.9998H7.75504C7.89311 15.9998 8.00422 15.8878 8.01285 15.75C8.05843 15.0221 8.30226 14.3235 8.71361 13.7284Z" fill="#2A4157" fill-opacity="0.24"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 11.8056C12.5 11.9316 12.594 12.0371 12.7179 12.0597C13.278 12.1617 13.8101 12.3821 14.2782 12.706C14.3819 12.7776 14.5229 12.7695 14.612 12.6804L18.5228 8.76961C18.6239 8.66851 18.6199 8.5031 18.5114 8.41C16.8974 7.02517 14.8828 6.19071 12.7623 6.02867C12.6198 6.01778 12.5 6.13194 12.5 6.27491V11.8056Z" fill="#222222"></path> </g></svg>`;
    priorityDiv.appendChild(priorityPicker);

    const priorityInput = makeInput("priority", priorityPicker);
    priorityDiv.appendChild(priorityInput);
    otherFieldsContainer.appendChild(priorityDiv);

    container.appendChild(otherFieldsContainer);

    const divider = document.createElement("div");
    divider.className = "w-full h-0.5 bg-slate-400 my-2 shadow-lg";
    container.appendChild(divider);

    const btnCreateTask = document.createElement("button");
    btnCreateTask.className =
        "rounded-lg bg-orange-500 text-white font-medium px-4 py-2 border-none self-end hover:bg-orange-700 transition-all";
    btnCreateTask.textContent = "Create Task";
    container.appendChild(btnCreateTask);

    const cleanUpForm = () => {
        taskInput.value = "";
        while (tagDisplayContainer.firstChild)
            tagDisplayContainer.removeChild(firstChild);
        categoryInput.classList.add("hidden");
        categoryInput.value = null;
        tagInput.classList.add("hidden");
        dateDisplay.classList.add("hidden");
        dateInput.value = null;
        priorityInput.classList.add("hidden");
        priorityInput.value = null;
    };

    btnCreateTask.addEventListener("click", () => {
        if (!taskInput.value) {
            formValidationDiv.textContent = "Please add a task title";
            return;
        }

        if (!dateInput.value) {
            formValidationDiv.textContent =
                "Please add a deadline for your task";
            dateInput.focus();
            return;
        }

        const tags = [...tagDisplayContainer.children].map((tag) => tag.id);
        console.log(dateInput.value);
        const task = new Task({
            name: taskInput.value,
            category: categoryInput.value,
            priority: priorityInput.value,
            endDate: dateInput.value,
            tags: tags,
        });
        TaskList.add(task);
        cleanUpForm();
    });

    tagPicker.addEventListener("click", () => {
        if (tagInput.classList.contains("hidden")) {
            tagInput.classList.remove("hidden");
            tagInput.classList.add("flex");
            tagInput.focus();
        } else {
            tagInput.classList.remove("flex");
            tagInput.classList.add("hidden");
        }
    });

    tagInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            if (tagInput.value) {
                const tag = createTag(tagInput.value);
                tagDisplayContainer.appendChild(tag);
                tagInput.value = "";
            }
        }
    });

    return container;
})();

const blurPrevNextMonth = () => {
    const currentDates = document.querySelectorAll(".datepicker-cell");
    const currentMonth = dayjs
        .unix(currentDates[10].dataset.date / 1000)
        .month();

    currentDates.forEach((dt) => {
        const thisMonth = dayjs.unix(dt.dataset.date / 1000).month();
        dt.style.color = "black";

        if (dt.classList.contains("focused")) dt.classList.remove("focused");

        if (thisMonth !== currentMonth) {
            dt.style.color = "#9098a0";
        }
    });
};

window.addEventListener("DOMContentLoaded", () => {
    document
        .querySelector("#datepicker")
        .addEventListener("changeDate", (e) => {
            const date = e.detail.date;
            const display = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            const dateDisplay = document.querySelector("#form-date-display");

            if (dateDisplay.classList.contains("hidden")) {
                dateDisplay.classList.remove("hidden");
                dateDisplay.classList.add("flex");
            }
            dateDisplay.textContent = display;
        });

    blurPrevNextMonth();

    const btnPrevMonth = document.querySelector(".prev-btn");
    const btnNextMonth = document.querySelector(".next-btn");

    btnPrevMonth.addEventListener("click", blurPrevNextMonth);
    btnNextMonth.addEventListener("click", blurPrevNextMonth);

    document.querySelector("#form-task-input").focus();
});

function createTag(content) {
    const tag = document.createElement("div");
    tag.className =
        "rounded-md bg-bgLighter text-white text-xs px-1 lg:text-sm lg:px-2 lg:py-1";
    tag.id = content.toLowerCase().trim();
    tag.textContent = `#${content.toLowerCase().replaceAll(" ", "-")}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "ml-1 text-bgExtraLight remove-btn";
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tag.appendChild(removeBtn);

    return tag;
}

function makeInput(type, btn) {
    const input = document.createElement("select");
    // input.id = `${type.toLowerCase().trim()}-input`;

    const width = type === "category" ? "w-24" : "w-16";

    input.className = `hidden text-center appearance-none text-xs font-medium bg-gray-200 rounded-full px-2 ${width} py-1 text-ellipsis transition-width duration-500 focus:outline-none lg:text-sm`;

    btn.addEventListener("click", () => {
        if (type === "category") {
            input.classList.add("lg:w-36");
            for (let category of VALID_CATEGORIES) {
                const option = document.createElement("option");
                option.textContent = util.toTitleCase(category);
                option.className = `text-sm`;
                input.appendChild(option);
            }
        } else if (type === "priority") {
            input.classList.add("lg:w-24");
            for (let priority of VALID_PRIORITIES) {
                const option = document.createElement("option");
                option.textContent = util.toTitleCase(priority);
                option.className = `text-sm`;
                input.appendChild(option);
            }
        }

        if (input.classList.contains("hidden")) {
            input.classList.remove("hidden");
            input.classList.add("inline-block");
            input.focus();
        } else {
            input.classList.remove("inline-block");
            input.classList.add("hidden");
        }
    });

    return input;
}

export default AddTask;
export { createTag };
