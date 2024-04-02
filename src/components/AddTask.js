import dayjs from "dayjs";
import "flowbite";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function AddTask() {
    let classNames;
    const container = document.createElement("div");
    classNames =
        "flex flex-col w-10/12 border-2 rounded-2xl border-gray-400 px-4 py-4";
    classNames.split(" ").forEach((cls) => {
        container.classList.add(cls);
    });

    const taskInput = document.createElement("textarea");
    taskInput.placeholder = "Add a new task...";
    classNames =
        "w-full h-32 resize-none border-none focus:outline-none active:border-none";
    classNames.split(" ").forEach((cls) => {
        taskInput.classList.add(cls);
    });
    container.appendChild(taskInput);

    const otherFieldsContainer = document.createElement("div");
    classNames = "flex gap-4";
    classNames.split(" ").forEach((cls) => {
        otherFieldsContainer.classList.add(cls);
    });

    const categoryPicker = document.createElement("button");
    categoryPicker.id = "btn-category-picker";
    categoryPicker.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z" fill="#292D32"></path> <path opacity="0.4" d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z" fill="#292D32"></path> <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" fill="#292D32"></path> <path d="M17.7099 21.9999C20.0792 21.9999 21.9999 20.0792 21.9999 17.7099C21.9999 15.3406 20.0792 13.4199 17.7099 13.4199C15.3406 13.4199 13.4199 15.3406 13.4199 17.7099C13.4199 20.0792 15.3406 21.9999 17.7099 21.9999Z" fill="#292D32"></path> </g></svg>`;
    otherFieldsContainer.appendChild(categoryPicker);

    const tagPicker = document.createElement("button");
    tagPicker.id = "btn-tag-picker";
    tagPicker.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <g opacity="0.4"> <path d="M19 22V16L17 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 16L21 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <g opacity="0.4"> <path d="M9.95039 6.25977L8.90039 15.7298" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.1105 6.25977L12.0605 15.7298" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.5293 9.41992H15.9993" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12.5801H15.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
    otherFieldsContainer.appendChild(tagPicker);

    // const datePicker = document.createElement("input");
    // datePicker.type = "date";
    // datePicker.innerHTML = `<svg viewBox="0 0 24 24" class="form-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z" fill="#1C274C"></path> <path opacity="0.5" d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z" fill="#1C274C"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path> </g></svg>`;

    // const outerDiv = document.createElement("div");
    // outerDiv.className = "relative max-w-sm";

    // // Create the inner div and set its classes and attributes
    // const innerDiv = document.createElement("div");
    // innerDiv.className =
    //     "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none";

    // // Create the SVG element and set its attributes
    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.setAttribute("class", "w-4 h-4 text-gray-500 dark:text-gray-400");
    // svg.setAttribute("aria-hidden", "true");
    // svg.setAttribute("fill", "currentColor");
    // svg.setAttribute("viewBox", "0 0 20 20");

    // // Create the path element for the SVG and set its attribute
    // const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // path.setAttribute(
    //     "d",
    //     "M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
    // );

    // // Append the path to the SVG
    // svg.appendChild(path);

    // // Append the SVG to the inner div
    // innerDiv.appendChild(svg);

    // // Create the input element and set its attributes and classes
    // // const input = document.createElement("input");
    // // // input.type = "date";
    // // input.setAttribute("datepicker", "");
    // // input.setAttribute("type", "text");

    // const input = document.createElement("div");
    // input.type = "text";
    // input.className =
    //     "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    // input.placeholder = "Select date";
    // new Datepicker(input, {
    //     "datepicker-title": "FlowBite DatePicker",
    //     "datepicker-autoselect-today": true,
    // });

    // // Append the inner div to the outer div
    // outerDiv.appendChild(innerDiv);

    // // Append the input to the outer div
    // outerDiv.appendChild(input);

    // otherFieldsContainer.appendChild(outerDiv);

    const input = document.createElement("input");
    input.type = "text";
    input.id = "datepicker";
    input.className = "datepicker-input";
    input.placeholder = "Select date";

    otherFieldsContainer.appendChild(input);

    new Datepicker(input, {
        autohide: true,
        todayHighlight: true,
        format: "dd/mm/yyyy",
        minDate: new Date(),
    });

    container.appendChild(otherFieldsContainer);

    return container;
}

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
    blurPrevNextMonth();

    const btnPrevMonth = document.querySelector(".prev-btn");
    const btnNextMonth = document.querySelector(".next-btn");

    btnPrevMonth.addEventListener("click", blurPrevNextMonth);
    btnNextMonth.addEventListener("click", blurPrevNextMonth);
});
