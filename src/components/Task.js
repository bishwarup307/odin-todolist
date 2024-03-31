import dayjs from "dayjs";
import Util from "./Utilities";
import Project, { ProjectList } from "./Project";
import fakeTasks from "./data/fakeTasks.json";

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
    child: "#FFC107",
    education: "#4CAF50",
    family: "#FF5722",
    finance: "#3F51B5",
    "health & fitness": "#F44336",
    home: "#795548",
    learning: "#9C27B0",
    personal: "#E91E63",
    professional: "#03A9F4",
};

export default class Task {
    constructor(
        name,
        description,
        endDate,
        categories = [],
        tags = [],
        priority,
        project
    ) {
        this.name = name;
        this.id = Util.getStrHash(name);
        this.description = description;
        this._endDate = endDate;
        this._categoryList = categories;
        this._tagList = tags;
        this._priority = priority;
        this._status = "todo";
        this._recurring = false;
        this._paused = false;

        const projectObject = ProjectList.find(project);
        if (projectObject) this._project = projectObject;
    }

    get displayName() {
        return Util.toTitleCase(this.name);
    }

    get tags() {
        return this._tagList;
    }

    get categories() {
        return this._categoryList;
    }

    get priority() {
        return this._priority;
    }

    set priority(priority) {
        if (VALID_PRIORITIES.includes(Util.processString(priority)))
            this._priority = Util.processString(priority);
        else throw new Error(`Invalid priority specified ${priority}`);
    }

    addCategories(...categories) {
        categories.forEach((category) => {
            if (!this._categoryList.includes(Util.processString(category)))
                this._categoryList.push(Util.processString(category));
        });
    }

    removeCategory(category) {
        this._categoryList = this._categoryList.filter(
            (cat) => cat !== Util.processString(category)
        );
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
        return dayjs(en);
    }

    set endDate(endDate) {
        this._endDate = endDate;
    }
}

function TaskList() {
    let taskList = JSON.parse(localStorage.getItem("tasks") || "[]");

    function add(task) {
        if (task instanceof Task) taskList.push(task);
        else throw new Error("Not a valid task object");
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

    function importFakeTasks() {
        fakeTasks.forEach((fakeTask) => {
            const newTask = new Task(fakeTask.name, fakeTask.description, fake);
        });
    }

    // function getByDate(taskDeadline) {}
}

export { VALID_CATEGORIES, categoryColors };

// const task1 = new Task("Pay rent", "Need to pay rent for my house", new Date());
// task1.addCategories("Finance", "Personal");
// task1.addTags("loan", "car-loan");
// task1.priority = "high";
// task1.changeStatus("done");
// task1.endDate = new Date(2024, 6, 19);
// console.log(task1.endDate);
