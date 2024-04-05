import dayjs from "dayjs";
import Util from "./Utilities";
import Project, { ProjectList } from "./Project";
import fakeTasks from "../data/fakeTasks.json";
import Calendar from "./Calendar";
import util from "./Utilities";

const VALID_PRIORITIES = ["critical", "high", "medium", "low"];
const VALID_STATUS = ["todo", "doing", "done", "paused", "archived"];
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
        icon: `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#F17300;} </style> <g> <path class="st0" d="M78.642,118.933c22.879,0,41.415-18.551,41.415-41.414c0-22.888-18.536-41.423-41.415-41.423 c-22.887,0-41.422,18.535-41.422,41.423C37.219,100.383,55.755,118.933,78.642,118.933z"></path> <path class="st0" d="M255.706,228.731v0.062c0.101,0,0.193-0.031,0.294-0.031c0.101,0,0.194,0.031,0.294,0.031v-0.062 c15.563-0.317,28.082-12.976,28.082-28.601c0-15.648-12.52-28.299-28.082-28.617v-0.062c-0.1,0-0.193,0.031-0.294,0.031 c-0.101,0-0.193-0.031-0.294-0.031v0.062c-15.563,0.318-28.082,12.969-28.082,28.617 C227.624,215.754,240.143,228.413,255.706,228.731z"></path> <path class="st0" d="M433.358,118.933c22.887,0,41.423-18.551,41.423-41.414c0-22.888-18.536-41.423-41.423-41.423 c-22.879,0-41.414,18.535-41.414,41.423C391.944,100.383,410.48,118.933,433.358,118.933z"></path> <path class="st0" d="M512,319.675V180.463c0-20.076-21.834-41.91-41.903-41.91h-5.799l-28.818,28.818l-28.214-28.214 c-17.839,2.609-33.564,13.665-41.918,30.018l-33.494,97.967c-1.154,2.245-3.298,3.84-5.792,4.281 c-2.493,0.442-5.048-0.31-6.914-2.036l-20.835-18.04c-6.232-5.769-14.409-8.974-22.902-8.974H256h-19.41 c-8.494,0-16.67,3.206-22.903,8.974l-20.835,18.04c-1.866,1.726-4.422,2.478-6.914,2.036c-2.494-0.442-4.638-2.036-5.792-4.281 l-33.494-97.967c-9.6-18.791-28.926-30.622-50.032-30.622H78.216H41.903C21.834,138.553,0,160.387,0,180.463v139.211 c0,10.035,8.13,18.172,18.165,18.172c4.939,0,0,0,12.682,0l6.906,118.724c0,10.677,8.664,19.333,19.341,19.333 c4.506,0,12.814,0,21.122,0c8.307,0,16.615,0,21.121,0c10.677,0,19.341-8.656,19.341-19.333l6.906-118.724l-0.086-84.765 c0-1.339,0.914-2.493,2.222-2.818c1.309-0.31,2.648,0.309,3.26,1.502l26.573,65.401c3.205,6.256,9.152,10.654,16.074,11.886 c6.921,1.23,14.021-0.844,19.186-5.614l25.426-18.729c0.852-0.782,2.083-0.983,3.136-0.542c1.061,0.472,1.742,1.518,1.742,2.663 l0.094,73.508l4.777,82.187c0,7.387,6,13.379,13.395,13.379c3.112,0,8.865,0,14.618,0c5.753,0,11.506,0,14.618,0 c7.394,0,13.394-5.992,13.394-13.379l4.777-82.187l0.093-73.508c0-1.146,0.681-2.192,1.742-2.663 c1.053-0.442,2.284-0.24,3.136,0.542l25.426,18.729c5.164,4.77,12.264,6.844,19.187,5.614c6.921-1.231,12.868-5.629,16.073-11.886 l26.572-65.401c0.612-1.192,1.951-1.812,3.26-1.502c1.308,0.325,2.222,1.479,2.222,2.818l-0.031,32.332l-27.881,86.648 c-0.659,2.051-0.302,4.296,0.967,6.039c1.27,1.742,3.298,2.772,5.451,2.772h23.91l4.405,75.699 c0,10.677,8.664,19.333,19.341,19.333c4.506,0,12.814,0,21.121,0c8.308,0,16.615,0,21.122,0c10.677,0,19.34-8.656,19.34-19.333 l4.406-75.699h26.418c2.152,0,4.181-1.03,5.451-2.772c1.27-1.743,1.626-3.988,0.968-6.039L500.1,336.67 C507.037,334.107,512,327.495,512,319.675z M85.424,159.087v74.592H63.389v-74.592H85.424z"></path> </g> </g></svg>`,
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
    default: {
        color: "#c6c6c6",
        icon: `<svg fill="#c6c6c6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path></g></svg>`,
    },
};

const getColor = (category) => categoryColors[category].color;

export default class Task {
    constructor({
        name,
        description,
        endDate,
        category,
        tags = [],
        priority,
        project,
    }) {
        this.name = name;
        this.description = description;

        this._endDate = null;
        this._category = null;
        this._tagList = [];
        this._priority = null;
        this._status = null;
        this._recurring = null;

        this.endDate = endDate;
        this.category = category;
        this.tags = tags;
        this.status = "todo";
        this.priority = priority;

        if (typeof project === "string") project = { name: project };
        const projectObject = ProjectList.find(project);
        if (projectObject) this._project = projectObject;
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

    get id() {
        return Util.getStrHash(this.name);
    }

    get displayName() {
        return Util.toTitleCase(this.name);
    }

    get tags() {
        return this._tagList;
    }

    set tags(tags) {
        this.addTags(...tags);
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
        // taskContainer.classList.add(borderColor);

        const leftDiv = document.createElement("div");
        leftDiv.className = "flex flex-col min-w-0 gap-1";

        const category = document.createElement("div");
        const bgColor = getColor(this.category);
        category.textContent = util.toTitleCase(this.category);
        category.className = `flex self-start justify-start items-center rounded-full px-2 text-white font-medium text-sm`;
        category.style.backgroundColor = bgColor;
        leftDiv.appendChild(category);

        const title = document.createElement("p");
        title.textContent = util.capitalize(this.name);
        title.className = "font-medium text-base text-textPrimary";
        leftDiv.appendChild(title);

        const description = document.createElement("p");
        description.textContent = util.capitalize(this.description);
        description.className = "text-sm text-slate-600 truncate";
        leftDiv.appendChild(description);

        const dateDiv = document.createElement("div");
        dateDiv.className = "flex gap-1 items-center mt-6 mb-1";

        if (this.endDate) {
            const dateIcon = document.createElement("div");
            dateIcon.className = "w-6 stroke-slate-600";
            dateIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5L5 3.5M21 5.5L19 3.5M9 12.5L11 14.5L15 10.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
            dateDiv.appendChild(dateIcon);

            const dateString = document.createElement("p");
            dateString.textContent = this.endDate;
            dateString.className = "text-sm text-slate-600";
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
            tagDiv.className = "flex gap-2 flex-wrap";

            this.tags.forEach((tag) => {
                const tagDisplay = document.createElement("div");
                tagDisplay.className =
                    "rounded-md bg-bgLightest text-textPrimary font-medium text-xs px-2 py-0.5 lg:text-sm lg:px-2 lg:py-1";

                tagDisplay.textContent = `#${tag
                    .toLowerCase()
                    .replaceAll(" ", "-")}`;

                tagDiv.appendChild(tagDisplay);
            });

            leftDiv.appendChild(tagDiv);
        }

        taskContainer.appendChild(leftDiv);

        const rightDiv = document.createElement("div");
        rightDiv.className = "flex flex-col justify-between ml-auto";

        const categoryIconDiv = document.createElement("div");
        categoryIconDiv.className = "w-10";
        categoryIconDiv.innerHTML = categoryColors[this.category].icon;
        rightDiv.appendChild(categoryIconDiv);
        taskContainer.appendChild(rightDiv);

        return taskContainer;
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
            Calendar.createEvent(task);
        } else throw new Error("Not a valid task object");
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

    // function getByDate(taskDeadline) {}

    return {
        add,
        get,
        getByStatus,
        getByPriority,
        getByProject,
        save,
        importFakeTasks,
        updateStatus,
        editTask,
    };
})();

export { TaskList, VALID_CATEGORIES, VALID_PRIORITIES, categoryColors };
