import todoPage from "../pages/todoPage";

document.addEventListener('DOMContentLoaded', () => todoPage('inbox'));

export default function ScreenController() {
  const navItems = document.querySelectorAll('.nav-item');
  const content = document.querySelector('#taskContainer');
  const addTaskDialog = document.querySelector('#addTaskDialog');
  const closeDialogBtn = document.querySelector('#addTaskDialog button:first-of-type');
  const confirmAddBtn = document.querySelector('#addTaskDialog button:last-of-type');
  const addTaskBtn = document.querySelector('#addTaskBtn');

  // Dialog inputs for adding todo's
  const title = document.querySelector('title');
  const description = document.querySelector('description');
  const dueDate = document.querySelector('dueDate');
  const priority = document.querySelector('priority');
  

  // Opens modal for adding tasks
  addTaskBtn.addEventListener('click', event => {
    addTaskDialog.showModal();
  });

  // Close modal for adding tasks
  closeDialogBtn.addEventListener('click', () => addTaskDialog.close());

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
