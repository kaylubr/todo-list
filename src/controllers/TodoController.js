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

export function deleteProject(projectName) {
  const allProjects = fetchAllProjects()
  delete allProjects[projectName];
  window.localStorage.setItem('projects', JSON.stringify(allProjects));
}

export function addTodo(projectName, title, desc, dueDate, priority) {
  const project = fetchProject(projectName);
  if (project) {
    if (!title || !desc || !dueDate || !priority) {
      throw new Error("Invalid inputs.");
    }

    const newTodo = new Todo(projectName, title, desc, dueDate, priority);
    project.todos.push(newTodo);

    const oldProjects = fetchAllProjects();
  
    window.localStorage.setItem('projects', JSON.stringify({ ...oldProjects, [projectName]: project }));
  } else {
    throw new Error('Project not found!')
  }
}

export function editTodo(projectName, id, title, desc, dueDate, priority) {
  const project = fetchProject(projectName);
  if (project) {
    const todoToEdit = project.todos.find(todo => todo.id === id);
    todoToEdit.title = title;
    todoToEdit.desc = desc;
    todoToEdit.dueDate = dueDate;
    todoToEdit.priority = priority;

    // Replaces the old todo with the new one using map
    project.todos.map(todo => todo.id === id ? todoToEdit : todo);

    const oldProjects = fetchAllProjects();
  
    window.localStorage.setItem('projects', JSON.stringify({ ...oldProjects, [projectName]: project }));
  } else {
    throw new Error('Project not found!')
  }
}

export function deleteTodo(projectName, id) {
  const project = fetchProject(projectName);
  if (project) {
    // If the id is not equal to the id param, it will be not filtered
    project.todos = project.todos.filter(todo => todo.id !== id);

    const oldProjects = fetchAllProjects();
  
    window.localStorage.setItem('projects', JSON.stringify({ ...oldProjects, [projectName]: project }));
  } else {
    throw new Error('Project not found!')
  }
}

export function completeTodo(projectName, id) {
  const project = fetchProject(projectName);
  if (project) {
    const todoToEdit = project.todos.find(todo => todo.id === id);
    todoToEdit.completed = true;

    // Replaces the old todo with the new one using map
    project.todos.map(todo => todo.id === id ? todoToEdit : todo);

    const oldProjects = fetchAllProjects();
  
    window.localStorage.setItem('projects', JSON.stringify({ ...oldProjects, [projectName]: project }));
  } else {
    throw new Error('Project not found!')
  }
} 

export function getAllTodos(projectName) {
  const project = fetchProject(projectName);
  return project.todos
}

export function getAllProjects() {
  const projects = fetchAllProjects();
  return Object.keys(projects).map(key => projects[key]);
}

function fetchAllProjects() {
  return JSON.parse(window.localStorage.getItem('projects'));
}

function fetchProject(projectName) {
  const projects = JSON.parse(window.localStorage.getItem('projects'));
  const key = Object.keys(projects).find(name => name === projectName);
  
  return key ? projects[key] : null;
}




