import fakeProjects from "../data/fakeProjects.json";

export default class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

const ProjectList = (function Projects() {
    let projectList = JSON.parse(localStorage.getItem("projects")) || [];

    function add(project) {
        projectList.push(project);
    }

    function getAllProjects() {
        return projectList;
    }

    function save() {
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    return { add, save, getAllProjects };
})();

fakeProjects.forEach((fakeProject) => {
    ProjectList.add(new Project(fakeProject.name, fakeProject.description));
});

ProjectList.save();

export { ProjectList };
