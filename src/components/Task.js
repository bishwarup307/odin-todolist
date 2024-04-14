import dayjs from "dayjs";
import { nanoid } from "nanoid";
import Util from "./Utilities";
import Project, { ProjectList } from "./Project";
import fakeTasks from "../data/fakeTasks.json";
import Calendar from "./Calendar";
import util from "./Utilities";
import Datepicker from "flowbite-datepicker/Datepicker";
import StateSwitch from "./StateSwitch";

const VALID_PRIORITIES = ["critical", "high", "medium", "low"];
const VALID_STATUS = ["to-do", "doing", "done", "paused", "archived"];
const VALID_CATEGORIES = [
    "child",
    "education",
    "family",
    "finance",
    "health & fitness",
    "home",
    "learning",
    "personal",
    "professional",
    "other",
];

const categoryColors = {
    child: {
        color: "#ff69b4",
        icon: `<svg fill="#ff69b4" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"></path></g></svg>`,
    },
    education: {
        color: "#4CAF50",
        icon: `<svg fill="#FFC107" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m 12.499079,12.25525 c 0.0968,0 0.188377,-0.0436 0.249339,-0.11884 0.06096,-0.0752 0.08473,-0.17385 0.06473,-0.26853 l -0.202146,-0.95662 c 0.115125,-0.11137 0.187491,-0.26686 0.187491,-0.43975 0,-0.182 -0.08106,-0.34343 -0.206876,-0.45558 l 0,-3.32202 -0.810333,0.50146 0,2.82056 c -0.125815,0.11215 -0.2069,0.27358 -0.2069,0.45558 0,0.17291 0.07239,0.32841 0.187515,0.43975 l -0.20217,0.95662 c -0.02,0.0947 0.0038,0.19335 0.06473,0.26853 0.06096,0.0752 0.152539,0.11884 0.249339,0.11884 l 0.625281,0 z M 12.773741,4.75539 7.5021019,1.49209 C 7.3477151,1.39699 7.1736728,1.34925 6.9996305,1.34925 c -0.1740423,0 -0.3482077,0.0477 -0.5016586,0.14284 l -5.271713,3.2633 C 1.0854931,4.84249 0.99999905,4.99633 0.99999905,5.1619 c 0,0.1656 0.085494,0.31949 0.22625985,0.40673 l 5.2716883,3.26333 c 0.153451,0.0952 0.3276163,0.14284 0.5016586,0.14284 0.1740423,0 0.3481092,-0.0477 0.5024714,-0.14284 L 12.773741,5.56863 c 0.140766,-0.0872 0.22626,-0.24113 0.22626,-0.40673 0,-0.16557 -0.08549,-0.31946 -0.22626,-0.40651 z M 6.9996059,9.78508 c -0.3283798,0 -0.6488777,-0.0912 -0.928242,-0.26411 l -3.0750017,-1.90368 0,3.27796 c 0,0.97016 1.7931578,1.7555 4.0032436,1.7555 2.2108742,0 4.0038842,-0.78536 4.0038842,-1.7555 l 0,-3.27796 -3.0748786,1.90368 C 7.6492472,9.69388 7.3279857,9.78508 6.9996059,9.78508 Z"></path></g></svg>`,
    },
    family: {
        color: "#F17300",
        icon: `<svg fill="#F17300" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 503.847 503.847" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M103.547,103.436c28.558,0,51.715-23.156,51.715-51.718C155.262,23.153,132.105,0,103.547,0 C74.982,0,51.83,23.152,51.83,51.718C51.829,80.28,74.982,103.436,103.547,103.436z"></path> <path d="M400.747,118.051c0.376,0.008,0.752,0.012,1.127,0.012c18.02,0,35.058-9.75,44.219-25.264 c9.29-15.733,9.394-35.819,0.265-51.647c-8.991-15.594-25.917-25.522-43.92-25.716c-18.033-0.194-35.186,9.373-44.513,24.809 c-9.45,15.637-9.761,35.72-0.797,51.642C365.952,107.559,382.761,117.664,400.747,118.051z"></path> <path d="M498.282,270.474c0.003,0.093,0.003,0.046-0.003-0.292c-0.041-1.54-0.036-1.25-0.023-0.697 c-0.341-12.033-1.179-24.021-3.016-35.929c-1.979-12.832-5.172-25.453-9.58-37.662c-8.343-23.099-22.681-45.266-43.003-59.531 c-4.214-2.988-8.784-5.375-13.312-7.869c-17.333-9.547-37.083-9.547-54.589-0.231c-21.516,11.452-38.917,29.724-50.131,51.018 c-5.997,11.385-10.272,23.512-13.609,35.912c-3.33,12.372-5.056,25.072-6.327,37.795c-1.143,11.437-1.077,22.965-0.97,34.44 c0.011,0.832,0.106,1.646,0.25,2.445c-3.478,2.024-7.211,3.519-11.401,4.083c-7.051,0.949-14.787-0.928-20.056-5.553 c-12.614-11.072-28.902-10.197-41.758,0.063c-5.452,4.353-12.953,6.433-19.967,5.488c-5.038-0.679-9.423-2.7-13.489-5.378 c0.572-1.307,0.98-2.711,1.173-4.196l0.016-0.115c0,0,0.375-2.911,0.902-8.043c0.519-5.133,1.177-12.493,1.502-21.44 c0.318-8.945,0.318-19.482-0.624-30.915c-0.947-11.423-2.827-23.762-6.303-36.072c-3.443-12.296-8.554-24.561-15.299-35.396 c-3.363-5.414-7.105-10.462-11.077-14.986c-3.968-4.528-8.16-8.529-12.335-11.941c-8.364-6.849-16.583-11.26-22.879-13.87 c-3.162-1.314-5.842-2.197-7.991-2.788c-12.688-3.469-27.115-2.971-39.203-0.705c-0.958,0.187-1.882,0.407-2.97,0.705 c-2.147,0.591-4.828,1.474-7.99,2.788c-6.296,2.61-14.516,7.021-22.879,13.871c-4.176,3.412-8.366,7.412-12.335,11.941 c-3.971,4.524-7.713,9.572-11.075,14.986c-6.745,10.835-11.857,23.1-15.299,35.396c-3.477,12.311-5.355,24.649-6.303,36.071 c-0.942,11.433-0.941,21.969-0.623,30.915c0.325,8.947,0.984,16.309,1.501,21.44c0.527,5.132,0.904,8.043,0.904,8.043l0.022,0.179 c1.035,7.815,7.898,13.679,15.922,13.318c8.48-0.38,15.045-7.562,14.666-16.042c0,0-0.122-2.707-0.21-7.423 c-0.081-4.714-0.115-11.439,0.264-19.411c0.381-7.964,1.169-17.182,2.778-26.746c1.605-9.555,4.028-19.461,7.489-28.625 c1.943-5.201,4.233-10.131,6.764-14.665l-11.32,93.46c-0.524,4.557-0.576,9.551,0,14.307c1.182,9.754,4.675,18.66,9.845,26.261 l7.962,167.901c0.461,9.11,7.79,16.629,17.09,17.047c9.883,0.442,18.253-7.209,18.697-17.092l5.686-126.83l5.912,126.858 c0.454,9.113,7.775,16.637,17.076,17.062c9.882,0.453,18.259-7.193,18.711-17.076l7.693-168.491 c7.521-11.366,11.208-25.354,9.44-39.946l-11.184-92.338c2.284,4.222,4.356,8.771,6.14,13.543 c3.46,9.163,5.883,19.07,7.488,28.625c1.608,9.563,2.396,18.781,2.778,26.746c0.38,7.971,0.345,14.697,0.265,19.411 c-0.088,4.716-0.21,7.423-0.21,7.423c-0.305,7.27,4.567,13.797,11.578,15.574c5.703,6.244,11.946,11.561,19.667,15.176 c7.032,3.297,14.95,4.676,22.683,4.248v25.023l0.085,4.089l-16.987,76.407c-0.35,1.788,0.113,3.622,1.27,5.027 c1.159,1.409,2.869,2.217,4.691,2.217h12.674l2.923,64.447c0.267,5.478,4.937,9.937,10.425,9.913 c5.423-0.021,10.019-4.403,10.314-9.813l3.54-64.547h1.394l2.923,64.447c0.269,5.478,4.937,9.937,10.425,9.913 c5.424-0.021,10.02-4.403,10.314-9.813l3.54-64.547h12.538c1.818,0,3.525-0.806,4.685-2.21c1.159-1.403,1.625-3.23,1.272-5.055 l-16.385-74.932l0.086-4.632v-25.938c7.604,0.427,15.404-0.899,22.35-4.082c5.606-2.567,10.438-6.056,14.85-10.132 c7.888,0.116,14.763-6.062,15.414-13.966c0.314-3.81,0.522-7.644,0.963-11.438c0.688-5.925,1.473-11.812,2.393-17.705 c1.929-12.356,5.261-24.561,9.628-36.268c1.092-2.927,2.292-5.841,3.617-8.671l0.536,36.234l-29.21,131.386 c-0.592,3.021,0.188,6.117,2.143,8.492c1.958,2.377,4.845,3.739,7.922,3.739h23.14l4.481,92.618 c0.482,9.291,8.368,16.871,17.681,16.918c9.259,0.046,17.188-7.342,17.812-16.575c0.005-0.095,0.011-0.188,0.016-0.281l4.8-92.68 h4.168l4.481,92.618c0.482,9.291,8.369,16.871,17.681,16.918c9.258,0.046,17.188-7.342,17.811-16.575 c0.006-0.095,0.012-0.188,0.017-0.282l4.799-92.679h22.364c3.07,0,5.954-1.357,7.91-3.728c1.955-2.37,2.743-5.459,2.146-8.534 l-28.855-131.978l0.412-35.663c4.974,11.813,8.285,26.446,10.691,39.015c2.078,10.846,3.173,21.794,4.081,32.789 c0.022,0.268,0.044,0.535,0.066,0.803c0.691,8.033,7.816,14.25,15.859,13.9c7.979-0.348,14.478-7.084,14.561-15.065 C498.312,280.722,498.379,275.6,498.282,270.474z"></path> <path d="M241.025,275.105c3.393,1.286,7.014,1.942,10.643,1.942c9.953,0,19.433-5.086,24.953-13.365 c5.601-8.397,6.565-19.363,2.518-28.611c-3.942-9.014-12.307-15.678-21.983-17.468c-9.893-1.83-20.247,1.515-27.188,8.795 c-6.948,7.291-9.791,17.832-7.462,27.632C224.777,263.593,231.839,271.613,241.025,275.105z"></path> </g> </g> </g></svg>`,
    },
    finance: {
        color: "#f2c643",
        icon: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#f2c643"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13,1c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S11.3,1,13,1 M20,14c0-2.4-1.8-4.4-4.5-5.4C15,9.4,14.1,10,13,10 c-1.2,0-2.3-0.8-2.8-1.8c-0.2,0-0.5,0.1-0.7,0.1L7,7v2.3c-1.5,0.9-2.6,2.2-2.9,3.7H2v4h3.1c0.5,0.6,1.2,1.2,1.9,1.7V22h2v-2.4 c0.9,0.3,1.9,0.4,3,0.4s2.1-0.2,3-0.4V22h2v-3.3c1.1-0.7,2-1.6,2.5-2.7H22v-2H20 M7,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1 S7.6,13,7,13z"></path> <rect fill="none" width="24" height="24"></rect> </g></svg>`,
    },
    "health & fitness": {
        color: "#E91E63",
        icon: `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#E91E63"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>health-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#E91E63" transform="translate(64.000000, 64.000000)"> <path d="M128,154.368 L192,282.36945 L226.517333,213.333333 L356.735892,213.332557 C326.677773,271.159881 271.765809,335.16014 192,405.333333 C112.234191,335.16014 57.3222272,271.159881 27.2641079,213.332557 L98.5180584,213.333333 L128,154.368 Z M268.8,1.42108547e-14 C332.423203,1.42108547e-14 384,51.5767968 384,115.2 C384,132.924092 380.921643,151.412754 374.764929,170.665986 L247.850667,170.666667 L224,122.963883 L192,186.944 L128,58.9638831 L72.128,170.666667 L9.23507092,170.665986 C3.07835697,151.412754 1.42108547e-14,132.924092 1.42108547e-14,115.2 C1.42108547e-14,51.5767968 51.5767968,1.42108547e-14 115.2,1.42108547e-14 C144.712861,1.42108547e-14 171.633638,11.098031 192.016682,29.348444 C212.383272,11.091061 239.296408,1.42108547e-14 268.8,1.42108547e-14 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>`,
    },
    home: {
        color: "#795548",
        icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 3H16C15.7239 3 15.5 3.22386 15.5 3.5V3.55891L19 6.35891V3.5C19 3.22386 18.7762 3 18.5 3Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z" fill="#795548"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 10.9605L21.5315 11.5857C21.855 11.8444 22.3269 11.792 22.5857 11.4685C22.8444 11.1451 22.792 10.6731 22.4685 10.4143L14.3426 3.91362C12.9731 2.81796 11.027 2.81796 9.65742 3.91362L1.53151 10.4143C1.20806 10.6731 1.15562 11.1451 1.41438 11.4685C1.67313 11.792 2.1451 11.8444 2.46855 11.5857L3.25003 10.9605V21.25H2.00003C1.58581 21.25 1.25003 21.5858 1.25003 22C1.25003 22.4142 1.58581 22.75 2.00003 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H20.75V10.9605ZM9.25003 9.5C9.25003 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25003 11.0188 9.25003 9.5ZM12.0494 13.25C12.7143 13.25 13.2871 13.2499 13.7459 13.3116C14.2375 13.3777 14.7088 13.5268 15.091 13.909C15.4733 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827C15.75 16.8679 15.75 16.9091 15.75 16.9506L15.75 21.25H14.25V17C14.25 16.2717 14.2484 15.8009 14.2018 15.454C14.1581 15.1287 14.0875 15.0268 14.0304 14.9697C13.9733 14.9126 13.8713 14.842 13.546 14.7982C13.1991 14.7516 12.7283 14.75 12 14.75C11.2717 14.75 10.8009 14.7516 10.4541 14.7982C10.1288 14.842 10.0268 14.9126 9.9697 14.9697C9.9126 15.0268 9.84199 15.1287 9.79826 15.454C9.75162 15.8009 9.75003 16.2717 9.75003 17V21.25H8.25003L8.25003 16.9506C8.24999 16.2858 8.24996 15.7129 8.31163 15.2542C8.37773 14.7625 8.52679 14.2913 8.90904 13.909C9.29128 13.5268 9.76255 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9507 13.25H12.0494Z" fill="#795548"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z" fill="#795548"></path> </g></svg>`,
    },
    learning: {
        color: "#9C27B0",
        icon: `<svg fill="#9C27B0" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 866 866" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M25,653.3h565.9v-89.6C579.1,548.1,571.2,529.4,568.6,509H127.3c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5h441.3 c7.2-56.6,55.601-100.5,114.101-100.5c63.399,0,115,51.6,115,115c0,26-8.601,49.9-23.2,69.2v89.6H841c13.8,0,25-11.2,25-25v-493 c0-13.8-11.2-25-25-25H25c-13.8,0-25,11.2-25,25v493C0,642.1,11.2,653.3,25,653.3z M283.3,188.8h299.4c8.3,0,15,6.7,15,15 c0,8.3-6.7,15-15,15H283.3c-8.3,0-15-6.7-15-15C268.3,195.5,275,188.8,283.3,188.8z M127.3,285.2h611.4c8,0,14.5,6.5,14.5,14.5 s-6.5,14.5-14.5,14.5H127.3c-8,0-14.5-6.5-14.5-14.5S119.3,285.2,127.3,285.2z"></path> <path d="M616.4,588.4V653.3v87.4c0,9.1,7.399,15,15.1,15c3.9,0,7.8-1.5,10.9-4.8l29.3-31.601c3-3.2,7-4.8,11-4.8s8,1.6,11,4.8 L723,750.9c3.1,3.3,7,4.8,10.9,4.8c7.699,0,15.1-5.9,15.1-15v-87.4V588.4c-18.7,13.3-41.6,21.1-66.3,21.1S635.2,601.7,616.4,588.4 z"></path> <path d="M762.6,522.8c3.301-9.2,5.101-19,5.101-28.3c0-46.9-38.101-85-85-85c-46.9,0-85,38.1-85,85c0,13,3.899,29,10.6,41.1 c2.5,4.5,5.4,8.801,8.7,12.7c15.6,19,39.3,31.101,65.7,31.101c26.399,0,50.1-12.101,65.7-31.101 C754.4,541,759.3,532.2,762.6,522.8z"></path> </g> </g> </g></svg>`,
    },
    personal: {
        color: "#18c98e",
        icon: `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#18c98e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#18c98e;} </style> <g> <path class="st0" d="M437.104,144.718h-20.63v127.705h20.63c13.993,0,25.339-11.346,25.339-25.339v-77.021 C462.443,156.064,451.097,144.718,437.104,144.718z"></path> <path class="st0" d="M444.659,380.916c0.006-15.17-6.192-29.03-16.142-38.966c-9.929-9.949-23.789-16.148-38.966-16.141 c-15.176-0.007-29.037,6.192-38.966,16.141c-9.956,9.936-16.148,23.796-16.148,38.966v19.4H316.66v76.416 c0,19.48,15.796,35.269,35.275,35.269h75.239c19.479,0,35.268-15.789,35.268-35.269v-76.416h-17.784V380.916z M361.193,380.916 c0-3.951,0.791-7.648,2.222-11.034c2.141-5.074,5.752-9.431,10.281-12.49c4.549-3.066,9.93-4.828,15.856-4.835 c3.95,0,7.648,0.792,11.033,2.222c5.074,2.142,9.431,5.76,12.49,10.289c3.059,4.542,4.828,9.923,4.834,15.848v19.4h-56.716V380.916 z M389.552,468.498c-10.063,0-18.223-8.161-18.223-18.223c0-10.063,8.16-18.223,18.223-18.223c10.062,0,18.222,8.16,18.222,18.223 C407.774,460.337,399.614,468.498,389.552,468.498z"></path> <path class="st0" d="M426.243,0h-27.647H85.757c-19.992,0-36.2,16.208-36.2,36.192v404.339c0,19.992,16.208,36.2,36.2,36.2h210.472 v-96.847h17.545l0.586-6.172c0.392-4.163,1.137-8.227,2.168-12.184c-20.044,4.31-52.713,7.442-93.002,7.442 c-67.564,0-113.986-8.772-114.697-17.198c-2.947-35.215,42.657-53.99,61.179-60.521c9.005-3.159,24.308-14.492,24.308-21.189 c0-4.45,0-10.01,0-17.611c-5.74-6.344-10.062-19.253-12.63-33.858c-6.039-2.156-9.477-5.6-13.753-20.624 c-4.403-15.396,5.959-15.49,6.777-15.49c-1.436-9.823-3.412-29.249,1.729-39.019c0,0-3.512-6.332-3.512-14.778 c14.764,2.108,61.897-28.132,75.977-3.525c20.397-2.095,32.569,26.689,23.318,57.322c0,0,11.452-0.538,6.87,15.49 c-4.303,15.024-7.721,18.468-13.747,20.624c-2.58,14.605-6.896,27.514-12.616,33.858c0,7.602,0,13.162,0,17.611 c0,6.697,14.399,17.498,24.268,21.189c14.252,5.341,44.719,17.591,56.49,39.132c0.884-0.971,1.73-1.962,2.667-2.893 c14.233-14.266,33.187-22.114,53.372-22.114c3.059,0,6.078,0.24,9.071,0.592v-178.27h38.507c13.993,0,25.339-11.34,25.339-25.333 V36.192C462.443,16.208,446.235,0,426.243,0z"></path> </g> </g></svg>`,
    },
    professional: {
        color: "#1f69e0",
        icon: `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#1f69e0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>work-case-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#1f69e0" transform="translate(42.666667, 64.000000)"> <path d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z" id="Combined-Shape-Copy"> </path> </g> </g> </g></svg>`,
    },
    other: {
        color: "#878787",
        icon: `<svg fill="#878787" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path></g></svg>`,
    },
};

const getColor = (category) => categoryColors[category].color;

export default class Task {
    constructor({
        id,
        name,
        description,
        endDate,
        category,
        tags = [],
        priority,
        project = "default",
        status,
    }) {
        this.name = name;
        this.description = description || "No description provided";
        this.id = id || nanoid();

        this._endDate = null;
        this._category = null;
        this._tagList = [];
        this._priority = null;
        this._status = null;
        this._recurring = null;
        this._project = null;

        this.endDate = endDate;
        this.category = category || "other";
        this.tags = tags;
        this.status = status || "to-do";
        this.priority = priority || "medium";
        this.project = project;
    }

    // To ensure the serialized object can be loaded into the class
    // definition later
    toJSON() {
        const obj = {};
        for (let [key, value] of Object.entries(this)) {
            // Remove the underscore prefix from the keys
            let cleanKey = key.startsWith("_") ? key.slice(1) : key;
            if (cleanKey === "tagList") cleanKey = "tags";
            obj[cleanKey] = value;
        }
        return obj;
    }

    get displayName() {
        return Util.toTitleCase(this.name);
    }

    get project() {
        return this._project;
    }

    set project(project) {
        if (typeof project === "string") project = { name: project };
        const projectObject = ProjectList.find(project);
        if (projectObject) this._project = projectObject;
    }

    get tags() {
        return this._tagList;
    }

    removeAllTags() {
        this._tagList = [];
    }

    set tags(tags) {
        this._tagList = tags;
    }

    get category() {
        return this._category;
    }

    set category(category) {
        if (VALID_CATEGORIES.includes(Util.processString(category)))
            this._category = Util.processString(category);
        else throw new Error(`Invalid category specified ${category}`);
    }

    get priority() {
        return this._priority;
    }

    set priority(priority) {
        if (VALID_PRIORITIES.includes(Util.processString(priority)))
            this._priority = Util.processString(priority);
        else throw new Error(`Invalid priority specified ${priority}`);
    }

    addTags(...tags) {
        tags.forEach((tag) => {
            if (!this._tagList.includes(tag)) this._tagList.push(tag);
        });
    }

    removeTag(tagName) {
        this._tagList = this._tagList.filter(
            (tag) => tag !== Util.processString(tagName)
        );
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        newStatus = Util.processString(newStatus);
        if (this._status === newStatus) return;

        if (VALID_STATUS.includes(newStatus)) this._status = newStatus;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(endDate) {
        if (dayjs(endDate).isValid()) {
            this._endDate = dayjs(endDate).format("YYYY-MM-DD");
        }
    }

    update(newTask) {
        Calendar.removeEvent(this);
        Object.assign(this, newTask);
        Calendar.createEvent(this.toJSON());
        TaskList.sync(this);
        util.updateUIHack();
    }

    makeTagDisplay(tag) {
        const tagDisplay = document.createElement("div");
        tagDisplay.dataset.tag = tag;
        tagDisplay.className =
            "tag rounded-md font-medium text-xs px-2 py-0.5 bg-black text-white lg:text-sm lg:px-2 lg:py-1";
        tagDisplay.textContent = `#${tag.toLowerCase().replaceAll(" ", "-")}`;
        return tagDisplay;
    }

    displayTask() {
        const taskContainer = document.createElement("div");
        // console.log(`${this.category} -> ${borderColor}`);
        taskContainer.style.setProperty(
            "--shadow-color",
            categoryColors[this.category].color
        );

        taskContainer.style.setProperty(
            "--shadow-color-alpha",
            categoryColors[this.category].color + "30"
        );

        taskContainer.className = "flex gap-3 rounded-lg px-6 py-4 shadow-task";

        const leftDiv = document.createElement("div");
        leftDiv.className = "flex flex-col min-w-0 gap-1";

        const categoryDiv = document.createElement("div");
        categoryDiv.className = "flex gap-2 items-center";
        const category = document.createElement("div");
        const bgColor = getColor(this.category);
        category.textContent = util.toTitleCase(this.category);
        category.className = `flex self-start justify-start items-center rounded-full px-2 text-white font-medium text-sm`;
        category.style.backgroundColor = bgColor;
        categoryDiv.appendChild(category);
        // const deleteTask = document.createElement("button");
        // deleteTask.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>`;
        // deleteTask.className =
        //     "relative mr-3 fill-slate-700 w-5 h-5 opacity-35 transition-opacity hover:opacity-100";
        // deleteTask.dataset.tooltip = "Delete task";

        // categoryDiv.appendChild(deleteTask);

        // deleteTask.addEventListener("click", () => {
        //     TaskList.remove(this.id);
        // });

        const expiredDiv = document.createElement("div");
        expiredDiv.className = "flex gap-1";
        const expiredIcon = document.createElement("div");
        expiredIcon.innerHTML = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z"></path></g></svg>`;
        expiredIcon.className = "w-4 fill-red-700";
        expiredDiv.appendChild(expiredIcon);
        const expiredText = document.createElement("p");
        expiredText.textContent = "Expired";
        expiredText.className = "text-sm text-red-700 font-semibold";
        expiredDiv.appendChild(expiredText);

        if (dayjs().isBefore(this.endDate)) {
            expiredDiv.style.display = "none";
        }
        categoryDiv.appendChild(expiredDiv);

        leftDiv.appendChild(categoryDiv);

        const title = document.createElement("p");
        title.textContent = util.capitalize(this.name);
        title.className = "font-medium text-base text-textPrimary self-start";
        leftDiv.appendChild(title);

        const description = document.createElement("p");
        description.textContent = util.capitalize(this.description);
        description.className = "text-sm text-slate-600 truncate self-start";
        leftDiv.appendChild(description);

        const projectDiv = document.createElement("div");
        projectDiv.className = "flex gap-2 items-center";
        const projectIcon = document.createElement("div");
        projectIcon.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="folder-alt" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,8H7A3,3,0,0,0,4.26,9.78L2,14.87V5A2,2,0,0,1,4,3H8a2.05,2.05,0,0,1,1.4.56L11.83,6H17A2,2,0,0,1,19,8Zm2.81,2.42A1,1,0,0,0,21,10H7a1,1,0,0,0-.91.59l-4,9A1,1,0,0,0,3,21H18a1,1,0,0,0,.95-.68l3-9A1,1,0,0,0,21.81,10.42Z"></path></g></svg>`;
        projectIcon.className = "w-6 fill-slate-700";
        projectDiv.appendChild(projectIcon);
        const projectName = document.createElement("p");
        projectName.textContent = Util.toTitleCase(this.project.name);
        projectName.className = "text-sm font-medium text-slate-700";
        projectDiv.appendChild(projectName);
        leftDiv.appendChild(projectDiv);

        const dateDiv = document.createElement("div");
        dateDiv.className = "flex gap-1 items-center mt-6 mb-1";

        if (this.endDate) {
            const dateIcon = document.createElement("div");
            dateIcon.className = "w-6 stroke-slate-600";
            dateIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5L5 3.5M21 5.5L19 3.5M9 12.5L11 14.5L15 10.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
            dateDiv.appendChild(dateIcon);

            const dateString = document.createElement("p");
            dateString.textContent = this.endDate;
            dateString.className = "text-sm text-slate-600 whitespace-nowrap";
            dateDiv.appendChild(dateString);
        }

        if (this.priority) {
            const priorityIcon = document.createElement("div");
            priorityIcon.className = "w-5 ml-4";
            priorityIcon.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>security-priority-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,2S6,7.1,6,8V26.2c0,9.2,13.3,17.3,17,19.5a1.8,1.8,0,0,0,2,0c3.8-2.1,17-10.3,17-19.5V8C42,7.1,24,2,24,2Zm5,23H25l3.1,9.2a.5.5,0,0,1-.9.6L18.3,22.7A1,1,0,0,1,19,21h4l-3.1-9.2a.5.5,0,0,1,.9-.6l8.9,12.1A1,1,0,0,1,29,25Z"></path> </g> </g> </g></svg>`;

            if (this.priority === "critical")
                priorityIcon.classList.add("fill-red-800");
            else if (this.priority === "high")
                priorityIcon.classList.add("fill-red-500");
            else if (this.priority === "medium")
                priorityIcon.classList.add("fill-amber-500");
            else if (this.priority === "low")
                priorityIcon.classList.add("fill-cyan-500");
            dateDiv.appendChild(priorityIcon);

            const priorityString = document.createElement("p");
            priorityString.textContent = util.capitalize(this.priority);
            priorityString.className = "text-sm text-slate-600";
            dateDiv.appendChild(priorityString);
        }

        leftDiv.appendChild(dateDiv);

        if (this.tags.length > 0) {
            const tagDiv = document.createElement("div");
            tagDiv.className = "tag-container flex gap-2 overflow-x-scroll";

            this.tags.forEach((tag) => {
                const tagDisplay = document.createElement("div");

                tagDisplay.className =
                    "whitespace-nowrap rounded-md font-medium text-xs px-2 py-0.5 lg:text-sm lg:px-2 lg:py-1";

                tagDisplay.style.backgroundColor =
                    getColor(this.category) + "20";
                tagDisplay.style.color = util.adjustColor(
                    getColor(this.category),
                    -50
                );
                tagDisplay.textContent = `#${tag
                    .toLowerCase()
                    .replaceAll(" ", "-")}`;

                tagDiv.appendChild(tagDisplay);
            });

            leftDiv.appendChild(tagDiv);
        }

        const stateSwitch = StateSwitch(this);
        leftDiv.appendChild(stateSwitch);

        taskContainer.appendChild(leftDiv);

        const rightDiv = document.createElement("div");
        rightDiv.className = "flex flex-col justify-between items-end ml-auto";

        const categoryIconDiv = document.createElement("div");
        categoryIconDiv.className = "w-10";
        categoryIconDiv.innerHTML = categoryColors[this.category].icon;
        rightDiv.appendChild(categoryIconDiv);

        const actionButtonDiv = document.createElement("div");
        actionButtonDiv.className = "mt-auto mb-10 flex gap-2 items-center";

        const btnEditTask = document.createElement("button");
        btnEditTask.className =
            "relative mt-auto w-8 px-1 py-1 rounded-full border-2 border-slate-300 fill-slate-300 hover:border-slate-500 hover:fill-slate-500";
        btnEditTask.innerHTML = `<svg viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pencil</title> <path d="M18.344 4.781l-3.406 3.063s1.125 0.688 2.156 1.656c1 0.969 1.719 2.063 1.719 2.063l2.906-3.469s-0.031-0.625-1.406-1.969c-1.406-1.344-1.969-1.344-1.969-1.344zM7.25 21.938l-0.156 1.5 10.813-11.25s-0.719-1-1.594-1.844c-0.906-0.875-1.938-1.563-1.938-1.563l-10.813 11.25 1.688-0.094 0.188 1.813zM0 26.719l2.688-5.5 1.5-0.125 0.125 1.719 1.813 0.25-0.188 1.375-5.438 2.75z"></path> </g></svg>`;
        btnEditTask.dataset.tooltip = "Edit the task";
        actionButtonDiv.appendChild(btnEditTask);

        const deleteTask = document.createElement("button");
        deleteTask.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297.001 297.001" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M241.348,85.53c-2.184-4.45-5.971-7.782-10.662-9.384L94.056,29.498c-9.686-3.303-20.251,1.884-23.558,11.567 l-5.573,16.324l171.753,58.638l5.574-16.323C243.854,95.014,243.533,89.979,241.348,85.53z"></path> <path d="M148.5,14.472l49.205,16.799l-6.157,18.036l12.069,4.12l8.218-24.07c1.138-3.333-0.642-6.957-3.974-8.095l-61.274-20.92 c-1.599-0.547-3.353-0.434-4.871,0.31c-1.518,0.745-2.679,2.064-3.225,3.663l-8.218,24.071l12.07,4.122L148.5,14.472z"></path> <path d="M183.237,275.016c0,5.099-4.133,9.232-9.232,9.232s-9.232-4.133-9.232-9.232V104.954l-42.338-14.455H60.256 c-0.926,0-1.857,0.152-2.701,0.531c-2.53,1.137-3.953,3.644-3.799,6.226l11.562,193.749c0.201,3.367,2.991,5.996,6.365,5.996 h138.741c3.374,0,6.164-2.629,6.365-5.996l9.843-164.931l-43.395-14.816V275.016z M117.333,275.016 c0,5.099-4.133,9.232-9.232,9.232s-9.232-4.133-9.232-9.232V103.252h18.464V275.016z"></path> </g> </g> </g> </g></svg>`;
        deleteTask.className =
            "relative w-8 px-1 py-1 rounded-full border-2 border-slate-300 fill-slate-300 hover:border-slate-500 hover:fill-slate-500";
        deleteTask.dataset.tooltip = "Delete task";

        const confirmDeleteModal = document.createElement("dialog");
        confirmDeleteModal.className =
            "rounded-lg shadow-sm shadow-white backdrop:bg-black/50 max-w-sm lg:max-w-md";
        const confirmContainer = document.createElement("div");
        confirmContainer.className = "flex px-4 py-4 flex-col gap-6";
        const confirmMsg = document.createElement("p");
        confirmMsg.innerHTML = `Do you want to delete the task <span class="font-bold">${this.name}</span>? This action cannot be undone.`;
        confirmContainer.appendChild(confirmMsg);
        const deleteActionsContainer = document.createElement("div");
        deleteActionsContainer.className =
            "flex justify-end items-center gap-4";
        const btnDeleteConfirm = document.createElement("button");
        btnDeleteConfirm.textContent = "Delete";
        btnDeleteConfirm.className =
            "rounded-md bg-red-700 text-white px-3 py-1";
        deleteActionsContainer.appendChild(btnDeleteConfirm);
        const btnCancelDelete = document.createElement("button");
        btnCancelDelete.textContent = "Cancel";
        btnCancelDelete.className =
            "rounded-md px-3 py-1 bg-slate-600 text-white";
        deleteActionsContainer.appendChild(btnCancelDelete);
        confirmContainer.appendChild(deleteActionsContainer);
        confirmDeleteModal.appendChild(confirmContainer);
        actionButtonDiv.appendChild(confirmDeleteModal);

        actionButtonDiv.appendChild(deleteTask);

        deleteTask.addEventListener("click", () => {
            confirmDeleteModal.showModal();
            // TaskList.remove(this.id);
        });

        btnCancelDelete.addEventListener("click", () => {
            confirmDeleteModal.close();
        });

        btnDeleteConfirm.addEventListener("click", () => {
            TaskList.remove(this.id);
        });

        rightDiv.appendChild(actionButtonDiv);
        taskContainer.appendChild(rightDiv);

        const editTaskModal = this.displayEditTaskModal();
        taskContainer.appendChild(editTaskModal);

        btnEditTask.addEventListener("click", () => {
            editTaskModal.showModal();
        });

        return taskContainer;
    }

    displayTaskRibbon() {
        function getPopoverCoordinates() {
            const buttonRect = taskRibbon.getBoundingClientRect();
            const popoverRect = taskCard.getBoundingClientRect();

            console.log(buttonRect);
            console.log(popoverRect);
            console.log(window.innerHeight);
            console.log(window.innerWidth);
            // Calculate the best position for the popover
            let top = buttonRect.height; // Default below the button
            let left = 0; // Aligned with the left side of the button

            // Check if the popover goes out of the viewport on the right
            if (buttonRect.left + popoverRect.width > window.innerWidth) {
                left = -popoverRect.width; // Adjust to the left
            }

            // Check if the popover goes out of the viewport at the bottom
            if (buttonRect.bottom + popoverRect.height > window.innerHeight) {
                console.log("hit");
                top = -popoverRect.height; // Place above the button
            }

            // Apply calculated position
            // top = buttonRect.bottom - top;
            // left = buttonRect.left - left;

            top = `${Math.floor(top)}px`;
            left = `${Math.floor(left)}px`;
            return { top, left };
        }

        const taskRibbon = document.createElement("button");
        taskRibbon.className = "relative flex px-3 rounded-full";
        taskRibbon.style.backgroundColor = categoryColors[this.category].color;
        const taskTitle = document.createElement("p");
        taskTitle.className = "text-sm text-white truncate";
        taskTitle.textContent = this.name;
        taskRibbon.appendChild(taskTitle);
        // const modal = this.displayEditTaskModal();
        // taskRibbon.appendChild(modal);
        // taskRibbon.addEventListener("click", () => {
        //     modal.showModal();
        // });

        const taskCard = this.displayTask();
        // taskCard.classList.add("w-[600px]");
        // taskCard.classList.add("lg:max-w-lg");
        taskCard.id = nanoid();
        taskCard.classList.add("task-card");
        taskCard.classList.add("hidden");
        taskCard.classList.add("opacity-0");
        taskCard.classList.add("absolute");
        // taskCard.classList.add("left-[50%]");
        taskCard.classList.add("bg-white");
        // taskCard.classList.add("opacity-90");
        taskCard.classList.add("z-10");
        taskCard.classList.add("transition-opacity");
        taskCard.classList.add("duration-300");
        taskCard.classList.add("origin-top-left");
        taskRibbon.appendChild(taskCard);

        function closePopOver(e) {
            const target = e.target.closest(".task-card");
            // console.log(target);
            if (target && target.id == taskCard.id) {
                return;
            }

            // taskCard.classList.add("scale-0");
            taskCard.style.opacity = "0";
            taskCard.classList.add("opacity-0");
            taskCard.classList.add("hidden");
            // taskCard.classList.add("scale-1");
            document.removeEventListener("click", closePopOver);
        }

        taskRibbon.addEventListener("click", (e) => {
            e.stopPropagation();
            taskCard.classList.remove("hidden");
            const { top, left } = getPopoverCoordinates();
            console.log(top);
            console.log(left);
            if (taskCard.classList.contains("opacity-0")) {
                taskCard.style.top = top;
                taskCard.style.left = left;
                // taskCard.classList.add("scale-0");
                taskCard.style.opacity = "0.9";
                // taskCard.classList.remove("scale-0");
            } // else taskCard.classList.add("scale-0");

            document.addEventListener("click", closePopOver);

            // taskCard.style.transform = "scale(1)";
        });

        return taskRibbon;
    }

    displayEditTaskModal() {
        const modal = document.createElement("dialog");
        modal.className =
            "w-3/4 max-w-[600px] rounded-lg backdrop:bg-black/50 shadow-sm shadow-white lg:w-1/2";

        const modalContainer = document.createElement("div");
        modalContainer.className = "flex flex-col px-8 py-8 gap-4";

        const editTaskDiv = document.createElement("div");
        editTaskDiv.className = "relative flex-1";

        const editTitle = document.createElement("input");
        editTitle.id = "input-edit-title";
        editTitle.className =
            "w-full h-16 border-2 border-black rounded-md px-2";
        editTitle.value = this.name;
        editTaskDiv.appendChild(editTitle);

        const labelEditTitle = document.createElement("label");
        labelEditTitle.for = "input-edit-title";
        labelEditTitle.textContent = "Title";
        labelEditTitle.className =
            "absolute top-[-12%] start-4 bg-white px-2 font-bold text-slate-500";
        editTaskDiv.appendChild(labelEditTitle);

        const editDescriptionDiv = document.createElement("div");
        editDescriptionDiv.className = "relative";

        const editDescription = document.createElement("textarea");
        editDescription.id = "input-edit-description";
        editDescription.className =
            "w-full h-24 border-2 border-black rounded-md px-2 py-3 resize-none";
        editDescription.value = this.description;
        editDescriptionDiv.appendChild(editDescription);

        const labelEditDescription = document.createElement("label");
        labelEditDescription.for = "input-edit-description";
        labelEditDescription.textContent = "Description";
        labelEditDescription.className =
            "absolute top-[-12%] start-4 bg-white px-2 font-bold text-slate-500";
        editDescriptionDiv.appendChild(labelEditDescription);

        const calendarDiv = document.createElement("div");
        calendarDiv.className = "flex gap-2 flex-wrap";

        const editCategoryDiv = document.createElement("div");
        editCategoryDiv.className = "relative flex-1";
        const editCategory = document.createElement("select");
        editCategory.id = "input-edit-category";
        editCategory.className =
            "rounded-lg border-2 border-black px-2 py-2 flex";
        VALID_CATEGORIES.forEach((category) => {
            let option = document.createElement("option");
            option.textContent = util.toTitleCase(category);
            option.value = category;

            if (category === this.category) option.setAttribute("selected", "");
            editCategory.appendChild(option);
        });
        editCategoryDiv.appendChild(editCategory);

        const labelCategoryChange = document.createElement("label");
        labelCategoryChange.for = "input-edit-category";
        labelCategoryChange.textContent = "Category";
        labelCategoryChange.className =
            "absolute top-[-25%] start-4 bg-white px-2 font-bold text-slate-500 font-xs";
        editCategoryDiv.appendChild(labelCategoryChange);

        calendarDiv.appendChild(editCategoryDiv);

        const editPriorityDiv = document.createElement("div");
        editPriorityDiv.className = "relative flex-1";
        const editPriority = document.createElement("select");
        editPriority.className =
            "rounded-lg border-2 border-black px-2 py-2 w-full flex";
        VALID_PRIORITIES.forEach((priority) => {
            let option = document.createElement("option");
            option.textContent = util.toTitleCase(priority);
            option.value = priority;

            if (priority === this.priority) option.setAttribute("selected", "");
            editPriority.appendChild(option);
        });
        editPriorityDiv.appendChild(editPriority);
        const labelEditPriority = document.createElement("label");
        labelEditPriority.for = "input-edit-category";
        labelEditPriority.textContent = "Priority";
        labelEditPriority.className =
            "absolute top-[-25%] start-4 bg-white px-2 font-bold text-slate-500 font-xs";
        editPriorityDiv.appendChild(labelEditPriority);
        calendarDiv.appendChild(editPriorityDiv);

        const datePicker = document.createElement("input");
        datePicker.type = "date";
        datePicker.value = this.endDate;
        datePicker.className =
            "border-2 border-black rounded-lg px-2 py-2 w-auto";
        calendarDiv.appendChild(datePicker);

        const tagDiv = document.createElement("div");
        tagDiv.className =
            "relative flex flex-wrap gap-1 border-2 rounded-md border-black px-1 py-1 pt-4";

        const tagDivLabel = document.createElement("p");
        tagDivLabel.textContent = "Tags";
        tagDivLabel.className =
            "absolute top-[-25%] start-4 bg-white px-2 font-bold text-slate-500 font-xs";
        tagDiv.appendChild(tagDivLabel);

        this.tags.forEach((tag) => {
            const tagDisplay = this.makeTagDisplay(tag);
            tagDiv.appendChild(tagDisplay);
        });

        const tagInput = document.createElement("input");
        tagInput.id = "input-edit-tags";
        tagInput.className = "px-2 w-36 focus:outline-none";
        tagDiv.appendChild(tagInput);

        tagDiv.addEventListener("click", () => {
            tagInput.focus();
        });
        tagDiv.addEventListener("click", () => {
            tagInput.focus();
        });

        tagInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === "Tab") {
                e.stopPropagation();
                if (tagInput.value) {
                    const tag = this.makeTagDisplay(tagInput.value);
                    tagDiv.insertBefore(tag, tagInput);
                    tagInput.value = "";
                    tagInput.focus();
                }
            }
        });

        tagDiv.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
                if (tagInput.value === "" && tagDiv.children.length > 2) {
                    tagDiv.removeChild(
                        tagDiv.children[tagDiv.children.length - 2]
                    );
                }
            }
        });

        const editProjectDiv = document.createElement("div");
        editProjectDiv.className = "relative flex-1";
        const editProject = document.createElement("select");
        editProject.className =
            "rounded-lg border-2 border-black px-2 py-2 flex";
        ProjectList.getAllProjects().forEach((project) => {
            let option = document.createElement("option");
            option.textContent = util.toTitleCase(project.name);
            option.value = project.name;

            if (project.name === this.project.name)
                option.setAttribute("selected", "");
            editProject.appendChild(option);
        });
        editProjectDiv.appendChild(editProject);
        const labelEditProject = document.createElement("label");
        labelEditProject.textContent = "Project";
        labelEditProject.className =
            "absolute top-[-25%] start-4 bg-white px-2 font-bold text-slate-500 font-xs";
        editProjectDiv.appendChild(labelEditProject);

        const btnSave = document.createElement("button");
        btnSave.textContent = "Save";
        btnSave.className =
            "rounded-md bg-black text-white font-medium border-2 border-transparent px-6 py-1 self-end transition-all hover:bg-white hover:border-black hover:text-black";

        btnSave.addEventListener("click", (e) => {
            e.stopPropagation();
            const tags = [];
            [...tagDiv.children].forEach((child) => {
                if (child.classList.contains("tag"))
                    tags.push(child.dataset.tag);
            });

            this.update({
                name: editTitle.value,
                description: editDescription.value,
                endDate: datePicker.value,
                category: editCategory.value,
                priority: editPriority.value,
                project: editProject.value,
                tags: tags,
            });
            modal.close();
            // TaskList.sync(this); // Save the edited task
        });

        modalContainer.appendChild(editTaskDiv);
        modalContainer.appendChild(editDescriptionDiv);
        modalContainer.appendChild(calendarDiv);
        modalContainer.appendChild(tagDiv);
        modalContainer.appendChild(editProjectDiv);
        modalContainer.appendChild(btnSave);

        modal.appendChild(modalContainer);
        return modal;
    }
}

const TaskList = (function Tasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks") || "[]");

    if (taskList.length > 0) {
        taskList = taskList.map((taskObject) => new Task({ ...taskObject }));
    }

    function add(task) {
        if (task instanceof Task) {
            taskList.push(task);
            Calendar.createEvent(task.toJSON());
            save();
            util.updateUIHack();
        } else throw new Error("Not a valid task object");
    }

    function remove(taskId) {
        const task = findTask(taskId);
        if (!task) return;
        taskList = taskList.filter((task) => task.id !== taskId);
        Calendar.removeEvent(task);
        save();
        util.updateUIHack();
    }

    function findTask(taskId) {
        return taskList.find((task) => task.id === taskId);
    }

    function editTask(taskId, newTask, ...callbacks) {
        const task = findTask(taskId);

        if (!task) return;

        task.name = newTask.name;
        task.description = newTask.description;
        task.category = newTask.category;
        task.tags = [];
        task.tags = newTask.tags;
        task.priority = newTask.priority;
        task.endDate = newTask.endDate;

        for (let callback of callbacks) callback();
    }

    function updateStatus(taskId, newStatus, ...callbacks) {
        const task = findTask(taskId);

        if (!task) return;
        task.status = newStatus;

        for (let callback of callbacks) callback();
    }

    function get() {
        return taskList;
    }

    function getByStatus(taskStatus) {
        return taskList.filter(
            (task) => task.status === Util.processString(taskStatus)
        );
    }

    function getByProject(projectName) {
        return taskList.filter(
            (task) => task.project.id === Util.getStrHash(projectName)
        );
    }

    function getByPriority(taskPriority) {
        return taskList.filter(
            (task) => task.priority === Util.processString(taskPriority)
        );
    }

    function save() {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    function importFakeTasks() {
        ProjectList.importFakeProjects();

        if (taskList.length > 0) return;

        fakeTasks.forEach((fakeTask) => {
            const newTask = new Task({ ...fakeTask });
            add(newTask);
        });
        save();
    }

    function sync(task) {
        const existingTask = findTask(task.id);
        if (existingTask) {
            Object.assign(existingTask, task);
        }
        save();
    }

    // function getByDate(taskDeadline) {}

    return {
        add,
        remove,
        get,
        getByStatus,
        getByPriority,
        getByProject,
        sync,
        save,
        importFakeTasks,
        updateStatus,
        editTask,
    };
})();

export { TaskList, VALID_CATEGORIES, VALID_PRIORITIES, categoryColors };
