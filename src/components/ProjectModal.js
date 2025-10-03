import { addProject } from "../controllers/TodoController";
import ProjectList from "./ProjectList";
import TodoPage from "../pages/TodoPage";

const container = document.querySelector('#content');
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
    container.dataset.currentProject = projectInput.value;
    container.dataset.currentPage = projectInput.value;
    ProjectList.render();
    TodoPage.renderPage();
    addProjectModal.close();
  }
}

export default ProjectModal;