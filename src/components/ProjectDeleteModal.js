import { deleteProject } from "../controllers/TodoController";
import ProjectList from "./ProjectList";
import TodoPage from "../pages/TodoPage";

const dialog = document.querySelector('#warningDialog');

class ProjectDeleteModal {
  static showModal(projectName) {
    const deleteBtn = document.querySelector('#warningDeleteBtn');
    const cancelBtn = document.querySelector('#warningDeleteBtn + button');
  
    dialog.showModal();
    deleteBtn.addEventListener('click', 
      () => ProjectDeleteModal.#handleDelete(projectName), 
      { once: true });
    
    cancelBtn.addEventListener('click', 
      () => dialog.close(), 
      { once: true });
  }

  static #handleDelete(projectName) {
    const container = document.querySelector('#content');
    container.dataset.currentProject = 'inbox';
    container.dataset.currentPage = 'inbox';
    deleteProject(projectName);
    ProjectList.render();
    TodoPage.renderPage();
    dialog.close();
  }
}

export default ProjectDeleteModal;