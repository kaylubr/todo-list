import { deleteProject } from "../controllers/TodoController";
import ProjectList from "./ProjectList";

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
    deleteProject(projectName);
    dialog.close();
    ProjectList.render();
  }
}

export default ProjectDeleteModal;