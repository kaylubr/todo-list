import { getAllTodos, completeTodo, deleteTodo } from "../controllers/TodoController";
import { format, isBefore, isToday, isTomorrow, isThisMonth, isAfter, addMonths } from "date-fns";
import TodoPage from "../pages/TodoPage";
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';

const container = document.querySelector('#content');
const taskContainer = document.querySelector('#taskContainer');

class TodoList {
  static resetTodos() {
    taskContainer.textContent = '';
  }

  static renderTodos(pageName) {
    const DATE_FILTERS = ['today', 'tommorow', 'month', 'upcoming'];
    let allTodos = getAllTodos(container.dataset.currentProject);
        
    if (DATE_FILTERS.includes(pageName)) {
      switch(pageName) {
        case 'today':
          allTodos = allTodos.filter(todo => isToday(todo.dueDate));
          break;
        case 'tommorow':
          allTodos = allTodos.filter(todo => isTomorrow(todo.dueDate));
          break;
        case 'month':
          allTodos = allTodos.filter(todo => isThisMonth(todo.dueDate));
          break;
        case 'upcoming':
          const nextMonth = addMonths(new Date(), 1);
          allTodos = allTodos.filter(todo => isAfter(todo.dueDate, nextMonth));
          break;
      }
    } else if (pageName === 'completed') {
      allTodos = allTodos.filter(todo => todo.completed);
    }

    console.log(allTodos);

    this.resetTodos();
    
    allTodos.forEach(todo => {   
      if (pageName !== 'completed' && todo.completed) {
        return;
      }

      if (isBefore(todo.dueDate, new Date())) {
        deleteTodo(todo.project, todo.id);
        return;
      }

      const todoCard = document.createElement('div');
      todoCard.setAttribute('id', 'todoCard');

      // Sections
      const startSection = document.createElement('div');
      const midSection = document.createElement('div');
      const endSection = document.createElement('div');
      
      // Start section
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.addEventListener('click', () => { 
        completeTodo(todo.project, todo.id);
        this.resetTodos();
        TodoPage.renderPage(todo.project);
      })

      const title = document.createElement('p');
      title.textContent = todo.title;

      // Mid section
      const dueDate = document.createElement('p');
  
      dueDate.textContent = format(todo.dueDate, 'MM/dd/yyyy');

      // End section
      const priority = document.createElement('div');
      priority.setAttribute('id', 'priorityIndicator')
      priority.textContent = todo.priority[0].toUpperCase() + todo.priority.slice(1);
      if (todo.priority === 'low') {
        priority.style.backgroundColor = '#006B3D';
      } else if (todo.priority === 'medium') {
        priority.style.backgroundColor = '#FFD301';
      } else if (todo.priority === 'high') {
        priority.style.backgroundColor = '#D61F1F';
      }

      const editBtn = document.createElement('img');
      editBtn.src = editIcon;
      editBtn.addEventListener('click', () => {
        const dialog = document.querySelector('#addTaskDialog');
        document.querySelector('#projectsDropdown').disabled = true;

        const projectInput = document.querySelector('#projectsDropdown');
        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#dueDate');
        const priority = document.querySelector('#priority');

        projectInput.value = todo.project;
        title.value = todo.title;
        description.value = todo.description;
        dueDate.value = todo.dueDate;
        priority.value = todo.priority;

        dialog.dataset.mode = 'edit';
        dialog.dataset.todoId = todo.id;
        dialog.showModal();
      });

      const deleteBtn = document.createElement('img');
      deleteBtn.src = deleteIcon;
      deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.project, todo.id);
        this.resetTodos();
        TodoPage.renderPage(todo.project);
      })

      if (pageName !== 'complete') {
        startSection.append(checkbox, title);
        midSection.append(dueDate);
        endSection.append(priority, editBtn, deleteBtn);
      } else {
        startSection.append(title);
        midSection.append(dueDate);
        endSection.append(priority);
      }

      todoCard.append(startSection, midSection, endSection);
      taskContainer.append(todoCard);
    });
    
    if (taskContainer.childNodes.length < 1) {
      taskContainer.textContent = 'Nothing here yet.';
    }
  }
}

export default TodoList