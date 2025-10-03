import { getAllProjects } from "../controllers/TodoController";
import { capitalize } from "../includes/capitalize";
import TodoList from "./TodoList";
import TodoPage from "../pages/TodoPage";
import ProjectDeleteModal from "./ProjectDeleteModal";
import deleteIcon from '../icons/deleteProject.svg';

const content = document.querySelector('#content');
const projectNavList = document.querySelector('#project-list');
const projectListDropdown = document.querySelector('#projectsDropdown');

class ProjectList {
  static #resetList() {
    const childrenToRemove = Array.from(projectListDropdown.children).slice(1);
    childrenToRemove.forEach(child => child.remove());
    projectNavList.textContent = ''
  }

  static render() {
    const projects = getAllProjects().filter(project => project.name !== 'inbox');

    ProjectList.#resetList();

    projects.forEach(project => {
      const li = document.createElement('li');
      li.setAttribute('id', project.name);
      li.classList.add('nav-item', 'project-item');
      li.addEventListener('click', () => {
        content.dataset.currentProject = project.name;
        content.dataset.currentPage = project.name;
        TodoList.resetTodos();
        TodoPage.renderPage();
      });

      const p = document.createElement('p');
      p.textContent = capitalize(project.name);

      const img = document.createElement('img');
      img.src = deleteIcon;
      img.setAttribute('id', 'deleteProjectBtn');
      img.addEventListener('click', () => ProjectDeleteModal.showModal());

      li.append(p, img);
      projectNavList.append(li);

      // Project list for adding/editing todo's dialog
      const option = document.createElement('option');
      option.value = project.name;
      option.textContent = project.name;
      projectListDropdown.append(option)
    });
  }
}

export default ProjectList;