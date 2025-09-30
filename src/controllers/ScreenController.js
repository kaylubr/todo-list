import { format } from "date-fns";
import { addTodo } from "./TodoController";
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
  // Opens modal for adding tasks
  addTaskBtn.addEventListener('click', () => {
    addTaskDialog.showModal();
  });

  // Close modal for adding tasks
  closeDialogBtn.addEventListener('click', () => addTaskDialog.close());

  confirmAddBtn.addEventListener('click', () => {
    const formatedDate = format(dueDate.value, 'MM/dd/yyyy');
    addTodo(projectName.value,title.value, description.value, formatedDate, priority.value);

    content.textContent = '';

    todoPage(projectName.value);
  });
}
