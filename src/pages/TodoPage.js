import TodoList from "../components/TodoList";
import { capitalize } from "../includes/capitalize";

class TodoPage {
  static renderPage() {
    const container = document.querySelector('#content');
    const pageHeader = document.querySelector('#content > h1');
    const pageName = container.dataset.currentPage;

    pageHeader.textContent = capitalize(pageName);

    TodoList.renderTodos(pageName);
  }
}


export default TodoPage;