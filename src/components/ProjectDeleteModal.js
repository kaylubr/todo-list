class ProjectDeleteModal {
  static showModal() {
    const dialog = document.querySelector('#warningDialog');
    const deleteBtn = document.querySelector('#warningDeleteBtn');
    const cancelBtn = document.querySelector('#warningDeleteBtn + button');
  
    dialog.showModal();

    let deleteBtnHasHandler = deleteBtn.dataset.hasHandler;
    let cancelBtnHasHandler = cancelBtn.dataset.hasHandler;

    if (!(deleteBtnHasHandler && cancelBtnHasHandler)) {
      deleteBtn.dataset.hasHandler = true;
      cancelBtn.dataset.hasHandler = true;

      deleteBtn.addEventListener('click', () => {
        
      });
      
      cancelBtn.addEventListener('click', () => dialog.close());
    }
  }
}

export default ProjectDeleteModal;