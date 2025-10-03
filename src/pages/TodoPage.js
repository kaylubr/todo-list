import TodoList from "../components/TodoList";
import { capitalize } from "../includes/capitalize";

class TodoPage {
  static renderPage(date = null, completedList = false) {
    const container = document.querySelector('#content');
    const pageTitle = document.querySelector('#content > h1');
    pageTitle.textContent = capitalize(container.dataset.currentPage);

    if (completedList) {
      TodoList.renderTodos('completeFilter');
    } else if (date) {
      TodoList.renderTodos('dateFilter', date);
    } else {
      TodoList.renderTodos();
    }
  }
}


export default TodoPage;