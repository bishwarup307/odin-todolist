import dayjs from "dayjs";
import Util from "./Utilities";
import Project, { ProjectList } from "./Project";
import fakeTasks from "../data/fakeTasks.json";
import Calendar from "./Calendar";

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
        category,
        tags = [],
        priority,
        project
    ) {
        this.name = name;
        this.id = Util.getStrHash(name);
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

        const projectObject = ProjectList.find(project);
        if (projectObject) this._project = projectObject;
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
        return this._categoryList;
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
}

const TaskList = (function Tasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks") || "[]");

    function add(task) {
        if (task instanceof Task) {
            taskList.push(task);
            Calendar.createEvent(task);
        } else throw new Error("Not a valid task object");
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
            const newTask = new Task(
                fakeTask.name,
                fakeTask.description,
                fakeTask.end_date,
                fakeTask.category,
                fakeTask.tags,
                fakeTask.priority,
                fakeTask.project
            );
            add(newTask);
        });
        save();
    }

    // function getByDate(taskDeadline) {}

    return {
        add,
        getByStatus,
        getByPriority,
        getByProject,
        save,
        importFakeTasks,
    };
})();

export { TaskList, VALID_CATEGORIES, categoryColors };

// const task1 = new Task("Pay rent", "Need to pay rent for my house", new Date());
// task1.addCategories("Finance", "Personal");
// task1.addTags("loan", "car-loan");
// task1.priority = "high";
// task1.changeStatus("done");
// task1.endDate = new Date(2024, 6, 19);
// console.log(task1.endDate);
