function todoPage(projectName, date = null, completedList = false) {
  const content = document.querySelector('#content');
  const pageTitle = document.createElement('h1');
  const todosContainer = document.createElement('div');
  const addTaskBtn = document.createElement('button');

  if (completedList) {
    pageTitle.textContent = 'Completed';
  } else if (date) {
    pageTitle.textContent = date[0].toUpperCase() + date.slice(1);
  } else {
    pageTitle.textContent = projectName[0].toUpperCase() + projectName.slice(1);
  }

  todosContainer.setAttribute('id', 'taskContainer');
  addTaskBtn.setAttribute('id', 'addTaskBtn');

  addTaskBtn.textContent = '+ ADD TASK';

  content.append(pageTitle, todosContainer, addTaskBtn);
}

export default todoPage;