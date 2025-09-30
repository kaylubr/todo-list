import { getAllTodos, completeTodo } from "../controllers/TodoController";

const taskContainer = document.querySelector('#taskContainer');

function todoPage(projectName, date = null, completedList = false) {
  const pageTitle = document.querySelector('#content > h1');

  if (completedList) {
    pageTitle.textContent = 'Completed';
    renderTodos(projectName, 'completeFilter');
  } else if (date) {
    pageTitle.textContent = date[0].toUpperCase() + date.slice(1);
    renderTodos(projectName);
  } else {
    pageTitle.textContent = projectName[0].toUpperCase() + projectName.slice(1);
    renderTodos(projectName);
  }
}

function renderTodos(projectName, mode = null) {
  let allTodos = getAllTodos('inbox');

  if (mode === 'completeFilter') {
    allTodos = allTodos.filter(todo => todo.completed);
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

    const todoOptionBtn = document.createElement('button');
    todoOptionBtn.textContent = '⚙️';
    endSection.append(priority, todoOptionBtn);

    todoCard.append(startSection, midSection, endSection);

    taskContainer.append(todoCard);
  });
  
  if (taskContainer.childNodes.length < 1) {
    taskContainer.textContent = 'Nothing here yet.';
  }
}

export default todoPage;