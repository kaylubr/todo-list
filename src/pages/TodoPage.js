import TodoList from "../components/TodoList";
import { capitalize } from "../includes/capitalize";

class TodoPage {
  static renderPage() {
    const container = document.querySelector('#content');
    const addTaskBtn = document.querySelector('#addTaskBtn');
    const pageHeader = document.querySelector('#content > h1');
    const pageName = container.dataset.currentPage;

    pageHeader.textContent = capitalize(pageName);

    if (pageName === 'completed') {
      addTaskBtn.style.display = 'none';
    } else {
      addTaskBtn.style.display = 'block';
    }

    TodoList.resetTodos();
    TodoList.renderTodos(pageName);
  }
}


export default TodoPage;