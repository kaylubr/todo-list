import { getAllProjects } from "../controllers/TodoController";
import { capitalize } from "../includes/capitalize";
import TodoPage from "./TodoPage";
import deleteIcon from '../icons/deleteProject.svg';

export default function projectList() {
  const content = document.querySelector('#content');
  const taskContainer = document.querySelector('#taskContainer');

  const projectList = document.querySelector('#project-list');
  const projects = getAllProjects().filter(project => project.name !== 'inbox');
  const projectListDropdown = document.querySelector('#projectsDropdown');

  // Resets project tab on nav
  projectList.textContent = ''

  // Resets Modal dropdown
  const childrenToRemove = Array.from(projectListDropdown.children).slice(1);
  childrenToRemove.forEach(child => child.remove());;

  projects.forEach(project => {
    // Project list for nav bar
    const li = document.createElement('li');
    li.setAttribute('id', project.name);
    li.classList.add('nav-item', 'project-item');
    li.addEventListener('click', () => {
      content.dataset.currentProject = project.name;
      content.dataset.currentPage = project.name;

      taskContainer.textContent = '';

      TodoPage.renderPage();
    });

    const p = document.createElement('p');
    p.textContent = capitalize(project.name);

    const img = document.createElement('img');
    img.src = deleteIcon;
    img.setAttribute('id', 'deleteProjectBtn');
    img.addEventListener('click', () => {
      const dialog = document.querySelector('#warningDialog');
      dialog.showModal();
    })

    li.append(p, img);
    projectList.append(li);

    // Project list for adding/editing todo's dialog
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    projectListDropdown.append(option)
  });
}
