import fakeProjects from "../data/fakeProjects.json";
import Util from "./Utilities";

export default class Project {
    constructor(name, description) {
        this.name = name;
        this.id = Util.getStrHash(name);
        this.description = description;
    }

    get displayName() {
        return Util.toTitleCase(this.name);
    }
}

const ProjectList = (function Projects() {
    let projectList = JSON.parse(localStorage.getItem("projects") || "[]");

    function add(project) {
        projectList.push(project);
    }

    function getAllProjects() {
        return projectList;
    }

    function save() {
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    function find(projectName) {
        return projectList.find(
            (project) => project.id === Util.getStrHash(projectName)
        );
    }

    function importFakeProjects() {
        if (projectList.length > 0) return;

        fakeProjects.forEach((fakeProject) => {
            projectList.push(
                new Project(fakeProject.name, fakeProject.description)
            );
        });
        save();
    }

    return { add, find, save, getAllProjects, importFakeProjects };
})();

// ProjectList.importFakeProjects();
export { ProjectList };
