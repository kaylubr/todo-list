import { addTodo, editTodo } from "../controllers/TodoController";
import TodoPage from "../pages/TodoPage";
import TodoList from "./TodoList";

const content = document.querySelector('#content');
const addTaskDialog = document.querySelector('#addTaskDialog');
const modalForm = document.querySelector('#taskDialogContainer > form');

// Dialog inputs for adding todo's
const projectName = document.querySelector('#projectsDropdown');

class TodoModal {
  static #resetModal() {
    TodoPage.renderPage(projectName.value);
    modalForm.reset();
    addTaskDialog.close();
  }

  static showModal() {
    const currentProject = content.dataset.currentProject;
    projectName.disabled = false;
    addTaskDialog.dataset.mode = 'add';
    projectName.value = currentProject;
    delete addTaskDialog.dataset.todoId;
    addTaskDialog.showModal();
  }

  static addTodo() {
    const projectInput = projectName.value;
    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;
    
    const mode = addTaskDialog.dataset.mode;

    try {
      switch(mode) {
        case 'add':
          addTodo(projectInput, title, desc, dueDate, priority);
          break;
        case 'edit':
          const id = addTaskDialog.dataset.todoId;
          editTodo(projectInput, id, title, desc, dueDate, priority);
          break;
      }
      content.dataset.currentProject = projectInput;
      TodoModal.#resetModal();
    } catch {
      return;
    }
  }

  static closeModal() {
    modalForm.reset();
    addTaskDialog.close()
  }
}

export default TodoModal;