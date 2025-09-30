import { getAllTodos, completeTodo, deleteTodo } from "../controllers/TodoController";
import { isToday, isTomorrow, isThisMonth, isAfter, addMonths } from "date-fns";
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';

const taskContainer = document.querySelector('#taskContainer');

function todoPage(projectName, date = null, completedList = false) {
  const pageTitle = document.querySelector('#content > h1');

  if (completedList) {
    pageTitle.textContent = 'Completed';
    renderTodos(projectName, 'completeFilter');
  } else if (date) {
    if (date === 'month') {
      pageTitle.textContent = 'This ' + date[0].toUpperCase() + date.slice(1);
    } else {
      pageTitle.textContent = date[0].toUpperCase() + date.slice(1);
    }
    renderTodos(projectName, 'dateFilter', date);
  } else {
    pageTitle.textContent = projectName[0].toUpperCase() + projectName.slice(1);
    renderTodos(projectName);
  }
}

function renderTodos(projectName, mode = null, date = null) {
  let allTodos = getAllTodos('inbox');

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
      completeTodo(projectName, todo.id);
      taskContainer.textContent = '';
      todoPage(projectName);
    })

    const title = document.createElement('p');
    title.textContent = todo.title;
    startSection.append(checkbox, title);

    // Mid section
    const dueDate = document.createElement('p');
    dueDate.textContent = todo.dueDate;
    midSection.append(dueDate);

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
      dialog.dataset.mode = 'edit';
      dialog.dataset.todoId = todo.id;
      dialog.showModal();
    });

    const deleteBtn = document.createElement('img');
    deleteBtn.src = deleteIcon;
    deleteBtn.addEventListener('click', () => {
      deleteTodo(projectName, todo.id);
      taskContainer.textContent = '';
      todoPage(projectName);
    })

    endSection.append(priority, editBtn, deleteBtn);
    todoCard.append(startSection, midSection, endSection);
    taskContainer.append(todoCard);
  });
  
  if (taskContainer.childNodes.length < 1) {
    taskContainer.textContent = 'Nothing here yet.';
  }
}

export default todoPage;