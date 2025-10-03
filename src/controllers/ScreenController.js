import projectList from "../pages/projectList";
import TodoPage from "../pages/TodoPage";
import ProjectModal from "../components/ProjectModal";
import TodoModal from "../components/TodoModal";

const content = document.querySelector('#content');
const taskContainer = document.querySelector('#taskContainer');

document.addEventListener('DOMContentLoaded', () => setupIntialRender());

export default function ScreenController() {
  // Nav items 
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      const pageName = event.currentTarget.id;

      taskContainer.textContent = '';
      content.dataset.currentProject = 'inbox';
      content.dataset.currentPage = pageName;

      TodoPage.renderPage(pageName);
    });
  });

  // Add Project Dialog
  const addProjectBtn = document.querySelector('#add-project-btn');
  const cancelAddProjectBtn = document.querySelector('#addProjectDialog button:first-of-type');
  const createProjectBtn = document.querySelector('#createProjectBtn');

  addProjectBtn.addEventListener('click', () => ProjectModal.showModal());
  cancelAddProjectBtn.addEventListener('click', () => ProjectModal.cancelModal());
  createProjectBtn.addEventListener('click', () => ProjectModal.addProject());

  // Add Todo Modal
  const addTaskBtn = document.querySelector('#addTaskBtn');
  const closeAddTodoModalBtn = document.querySelector('#addTaskDialog button:first-of-type');
  const confirmAddTodoBtn = document.querySelector('#addTaskDialog button:last-of-type');
  
  addTaskBtn.addEventListener('click', () => TodoModal.showModal());
  closeAddTodoModalBtn.addEventListener('click', () => TodoModal.closeModal());
  confirmAddTodoBtn.addEventListener('click', () => TodoModal.addTodo());
}

function setupIntialRender() {
  const dueDate = document.querySelector('#dueDate');

  // Disable past days for dueDate
  dueDate.setAttribute('min', new Date());
  projectList();
  content.dataset.currentProject = 'inbox'
  content.dataset.currentPage = 'inbox';
  TodoPage.renderPage('inbox');
}