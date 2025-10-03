import { addTodo, editTodo } from "../controllers/TodoController";
import TodoPage from "../pages/TodoPage";
import TodoList from "./TodoList";

const addTaskDialog = document.querySelector('#addTaskDialog');
const modalForm = document.querySelector('#taskDialogContainer > form');

// Dialog inputs for adding todo's
const projectName = document.querySelector('#projectsDropdown');

class TodoModal {
  static #resetModal() {
    TodoList.resetTodos();
    TodoPage.renderPage(projectName.value);
    document.querySelector('#taskDialogContainer > form').reset();
    addTaskDialog.close();
  }

  static showModal() {
    addTaskDialog.showModal();
    projectName.disabled = false;
    addTaskDialog.dataset.mode = 'add';
    delete addTaskDialog.dataset.todoId;
  }

  static addTodo() {
    const projectInput = projectName.value;
    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;
    
    const mode = addTaskDialog.dataset.mode;

    switch(mode) {
      case 'add':
        addTodo(projectInput, title, desc, dueDate, priority);
        break;
      case 'edit':
        const id = addTaskDialog.dataset.todoId;
        editTodo(projectInput, id, title, desc, dueDate, priority);
        break;
    }

    TodoModal.#resetModal();
  }

  static closeModal() {
    modalForm.reset();
    addTaskDialog.close()
  }
}

export default TodoModal;