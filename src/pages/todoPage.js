import { getAllTodos, completeTodo, deleteTodo } from "../controllers/TodoController";
import { isToday, isTomorrow, isThisMonth, isAfter, addMonths } from "date-fns";
import { capitalize } from "../includes/capitalize";
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';

const container = document.querySelector('#content');
const taskContainer = document.querySelector('#taskContainer');

function todoPage(date = null, completedList = false) {
  const pageTitle = document.querySelector('#content > h1');
  pageTitle.textContent = capitalize(container.dataset.currentPage);

  if (completedList) {
    renderTodos('completeFilter');
  } else if (date) {
    renderTodos('dateFilter', date);
  } else {
    renderTodos();
  }
}

function renderTodos(mode = null, date = null) {
  let allTodos = getAllTodos(container.dataset.currentProject);

  if (mode === 'completeFilter') {
    allTodos = allTodos.filter(todo => todo.completed);
  } else if (mode === 'dateFilter') {
    switch(date) {
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
  }

  allTodos.forEach(todo => {
    if (mode !== 'completeFilter' && todo.completed) {
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
      taskContainer.textContent = '';
      todoPage(todo.project);
    })

    const title = document.createElement('p');
    title.textContent = todo.title;

    // Mid section
    const dueDate = document.createElement('p');
    dueDate.textContent = todo.dueDate;

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

      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      const dueDate = document.querySelector('#dueDate');
      const priority = document.querySelector('#priority');

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
      taskContainer.textContent = '';
      todoPage(todo.project);
    })

    if (mode !== 'completeFilter') {
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

export default todoPage;