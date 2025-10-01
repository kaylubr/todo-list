import { getAllProjects } from "../controllers/TodoController";
import { capitalize } from "../includes/capitalize";

export default function projectList() {
  const projectList = document.querySelector('#project-list');
  const projects = getAllProjects().filter(project => project.name !== 'inbox');

  projectList.textContent = ''

  projects.forEach(project => {
    const li = document.createElement('li');
    li.setAttribute('id', project.name);
    li.classList.add('nav-item', 'project-item');

    const p = document.createElement('p');
    p.textContent = capitalize(project.name);

    const button = document.createElement('button');
    button.setAttribute('id', 'project-option');
    button.textContent = '...'

    li.append(p, button);
    projectList.append(li);
  });
}
