import { format } from "date-fns";
import { addTodo, editTodo } from "./TodoController";
import todoPage from "../pages/todoPage";

const navItems = document.querySelectorAll('.nav-item');
const content = document.querySelector('#taskContainer');
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

export default function ScreenController() {
  document.addEventListener('DOMContentLoaded', () => {
    todoPage('inbox');
  });

  handleAddTaskModal();
  handleNavItems();    
}

function handleNavItems() {
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      const sectionName = event.currentTarget.id;
      
      if (!sectionName) {
        return;
      }

      content.textContent = '';

      switch(sectionName) {
        case 'today':
          todoPage(null, sectionName);
          break;
        case 'tommorow':
          todoPage(null, sectionName);
          break;
        case 'month':
          todoPage(null, sectionName);
          break;
        case 'upcoming':
          todoPage(null, sectionName);
          break;
        case 'completed':
          todoPage(null, null, sectionName);
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

    content.textContent = '';

    todoPage(projectName.value);
    document.querySelector('#taskDialogContainer > form').reset();
    addTaskDialog.close();
  });
}
