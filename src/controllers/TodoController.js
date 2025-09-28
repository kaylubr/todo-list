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





