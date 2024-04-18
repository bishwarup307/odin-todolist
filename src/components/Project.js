import { nanoid } from "nanoid";
import fakeProjects from "../data/fakeProjects.json";
import Util from "./Utilities";
import util from "./Utilities";
import Toast from "./Toast";

export default class Project {
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this.id = id || nanoid();
    }

    get displayName() {
        return Util.toTitleCase(this.name);
    }
}

const ProjectList = (function Projects() {
    let projectList = JSON.parse(localStorage.getItem("projects") || "[]");

    function add(project) {
        if (!find(project)) {
            projectList.push(project);
            save();
            util.updateUIHack();
            // prevent toast message when the application boots
            if (project.name !== "default") {
                const toast = Toast("A new project is created");
                document.querySelector("#toast").appendChild(toast.getToast());
                toast.showToast();
            }
        }
    }

    function getAllProjects() {
        return projectList;
    }

    function save() {
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    function find({ name }) {
        return projectList.find((project) => project.name === name);
    }

    function importFakeProjects() {
        fakeProjects.forEach((fakeProject) => {
            add(new Project(fakeProject.name, fakeProject.description));
        });
        save();
    }

    // add a default project when the application boots
    add(
        new Project(
            "default",
            "this is the default project to hold arbitrary tasks"
        )
    );

    return { add, find, save, getAllProjects, importFakeProjects };
})();

export { ProjectList };
