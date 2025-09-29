import { getAllTodos, getCompletedTodos } from "../controllers/TodoController";

function todoPage(projectName, date = null, completedList = false) {
  const pageTitle = document.querySelector('#content > h1');
  const taskContainer = document.querySelector('#taskContainer');

  if (completedList) {
    pageTitle.textContent = 'Completed';

  } else if (date) {
    pageTitle.textContent = date[0].toUpperCase() + date.slice(1);
  } else {
    pageTitle.textContent = projectName[0].toUpperCase() + projectName.slice(1);
  }
}

function renderTodos() {

}

export default todoPage;