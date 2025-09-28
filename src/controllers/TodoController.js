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

export function addTodoInDefault(title, desc, dueDate, priority) {
  const project = fetchProject('inbox');

  const newTodo = new Todo(title, desc, dueDate, priority);
  project.todos.push(newTodo);

  const oldProjects = fetchAllProjects();
  
  window.localStorage.setItem('projects', JSON.stringify({ ...oldProjects, inbox: project }));
}

export function addProject(projectName) {
  const doesProjectExist = fetchProject(projectName);
  if (!doesProjectExist) {
    const allProjects = fetchAllProjects();
    allProjects[projectName] = new Project(projectName);
    window.localStorage.setItem('projects', JSON.stringify(allProjects));
  } else {
    throw new Error('Project already exists!');
  }
}

function fetchAllProjects() {
  return JSON.parse(window.localStorage.getItem('projects'));
}

function fetchProject(projectName) {
  const projects = JSON.parse(window.localStorage.getItem('projects'));
  const key = Object.keys(projects).find(name => name === projectName);
  
  return key ? projects[key] : null;
}




