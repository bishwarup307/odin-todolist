import { nanoid } from "nanoid";
import fakeProjects from "../data/fakeProjects.json";
import Util from "./Utilities";

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
        // if (projectList.length > 0) return;

        fakeProjects.forEach((fakeProject) => {
            projectList.push(
                new Project(fakeProject.name, fakeProject.description)
            );
        });
        save();
    }

    add(
        new Project(
            "default",
            "this is the default project to hold arbitrary tasks"
        )
    );

    return { add, find, save, getAllProjects, importFakeProjects };
})();

// ProjectList.importFakeProjects();
export { ProjectList };
