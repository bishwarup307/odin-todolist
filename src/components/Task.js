import { format } from "date-fns";
import Project from "./Project";

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

const processString = (str) => str.trim().toLowerCase();

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
        this.description = description;
        this._endDate = endDate;
        this._categoryList = categories;
        this._tagList = tags;
        this._priority = priority;
        this._status = "todo";
        this._recurring = false;
        this._paused = false;
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
        if (VALID_PRIORITIES.includes(processString(priority)))
            this._priority = processString(priority);
        else throw new Error(`Invalid priority specified ${priority}`);
    }

    addCategories(...categories) {
        categories.forEach((category) => {
            if (!this._categoryList.includes(processString(category)))
                this._categoryList.push(processString(category));
        });
    }

    removeCategory(category) {
        this._categoryList = this._categoryList.filter(
            (cat) => cat !== processString(category)
        );
    }

    addTags(...tags) {
        tags.forEach((tag) => {
            if (!this._tagList.includes(tag)) this._tagList.push(tag);
        });
    }

    removeTag(tagName) {
        this._tagList = this._tagList.filter(
            (tag) => tag !== processString(tagName)
        );
    }

    changeStatus(newStatus) {
        newStatus = processString(newStatus);
        if (this._status === newStatus) return;

        if (VALID_STATUS.includes(newStatus)) this._status = newStatus;
    }

    get endDate() {
        return format(this._endDate, "dd MMM, yyyy");
    }

    set endDate(endDate) {
        this._endDate = endDate;
    }
}

export { VALID_CATEGORIES, categoryColors };

const task1 = new Task("Pay rent", "Need to pay rent for my house", new Date());
task1.addCategories("Finance", "Personal");
task1.addTags("loan", "car-loan");
task1.priority = "high";
task1.changeStatus("done");
task1.endDate = new Date(2024, 6, 19);
console.log(task1.endDate);
