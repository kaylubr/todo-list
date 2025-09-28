import Project from "../models/Project";
import Todo from "../models/Todo";

// Initializes default project
const defaultProject = new Project('inbox');

//  Initalizes localStorage if there isn't an existing one
if (!window.localStorage.getItem('projects')) {
  window.localStorage.setItem('projects', 
    JSON.stringify({ 'inbox': defaultProject })
  );
}


function fetchAllProjects() {
  return JSON.parse(window.localStorage.getItem('projects'));
}

function fetchProject(projectName) {
  const projects = JSON.parse(window.localStorage.getItem('projects'));
  const key = Object.keys(projects).find(name => name === projectName);
  
  return key ? projects[key] : null;
}




