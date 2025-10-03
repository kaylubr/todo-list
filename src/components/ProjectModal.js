import { addProject } from "../controllers/TodoController";
import projectList from "../pages/projectList";

const addProjectModal = document.querySelector('#addProjectDialog');
const projectInput = document.querySelector('#project-name');

class ProjectModal {
  static showModal() {
    projectInput.value = '';
    addProjectModal.showModal();
  }

  static cancelModal() {
    addProjectModal.close();
  }

  static addProject() {
    addProject(projectInput.value);
    projectList();
    addProjectModal.close();
  }
}

export default ProjectModal;