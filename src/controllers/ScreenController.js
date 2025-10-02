import { format } from "date-fns";
import { addTodo, editTodo, addProject, getAllProjects } from "./TodoController";
import projectList from "../pages/projectList";
import todoPage from "../pages/todoPage";

const content = document.querySelector('#content');

// Elements for adding tasks
const taskContainer = document.querySelector('#taskContainer');
const addTaskDialog = document.querySelector('#addTaskDialog');
const closeDialogBtn = document.querySelector('#addTaskDialog button:first-of-type');
const confirmAddBtn = document.querySelector('#addTaskDialog button:last-of-type');
const addTaskBtn = document.querySelector('#addTaskBtn');

// Dialog inputs for adding todo's
const projectName = document.querySelector('#projectsDropdown');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

const currentDate = format(new Date(), 'yyyy-MM-dd');

// Disable past days for dueDate
dueDate.setAttribute('min', currentDate);

document.addEventListener('DOMContentLoaded', () => {
  projectList();
  content.dataset.currentProject = 'inbox'
  content.dataset.currentPage = 'inbox';
  todoPage('inbox');
});

export default function ScreenController() {
  handleAddTaskModal();
  handleAddProjectModal();
  handleNavItems();    
}

function handleNavItems() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      const sectionName = event.currentTarget.id;

      taskContainer.textContent = '';
      content.dataset.currentProject = 'inbox';
      content.dataset.currentPage = sectionName;

      switch(sectionName) {
        case 'today':
          todoPage(sectionName);
          break;
        case 'tommorow':
          todoPage(sectionName);
          break;
        case 'month':
          todoPage(sectionName);
          break;
        case 'upcoming':
          todoPage(sectionName);
          break;
        case 'completed':
          todoPage(null, sectionName);
          break; 
        default:
          todoPage(sectionName);
          break; 
      }
    });
  });
}

function handleAddTaskModal() {
  addTaskBtn.addEventListener('click', () => {
    addTaskDialog.showModal();
    projectName.disabled = false;
    addTaskDialog.dataset.mode = 'add';
    delete addTaskDialog.dataset.todoId;
  });

  closeDialogBtn.addEventListener('click', () => {
    document.querySelector('#taskDialogContainer > form').reset();
    addTaskDialog.close()
  });

  confirmAddBtn.addEventListener('click', () => {
    const mode = addTaskDialog.dataset.mode;
    const projectInput = projectName.value;
    const titleInput = title.value;
    const descriptionInput = description.value;
    const dueDateInput =  format(dueDate.value, 'MM/dd/yyyy');
    const priorityInput = priority.value;

    switch(mode) {
      case 'add':
        addTodo(projectInput, titleInput, descriptionInput, dueDateInput, priorityInput);
        break;
      case 'edit':
        editTodo(projectInput, 
                addTaskDialog.dataset.todoId, 
                titleInput, 
                descriptionInput, 
                dueDateInput, 
                priorityInput);
        break;
    }

    taskContainer.textContent = '';

    console.log(projectInput);

    todoPage(projectInput);
    document.querySelector('#taskDialogContainer > form').reset();
    addTaskDialog.close();
  });
}

function handleAddProjectModal() {
  const addProjectBtn = document.querySelector('#add-project-btn');
  const addProjectModal = document.querySelector('#addProjectDialog');
  const cancelBtn = document.querySelector('#addProjectDialog button:first-of-type');
  const createBtn = document.querySelector('#createProjectBtn');
  const projectInput = document.querySelector('#project-name');

  addProjectBtn.addEventListener('click', () => {
    projectInput.value = '';
    console.log(getAllProjects());
    addProjectModal.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    addProjectModal.close();
  });

  createBtn.addEventListener('click', () => {
    addProject(projectInput.value);
    projectList();
    addProjectModal.close();
  });
}