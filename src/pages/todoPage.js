function todoPage(projectName, date = null, completedList = false) {
  const pageTitle = document.querySelector('#content > h1');

  if (completedList) {
    pageTitle.textContent = 'Completed';
  } else if (date) {
    pageTitle.textContent = date[0].toUpperCase() + date.slice(1);
  } else {
    pageTitle.textContent = projectName[0].toUpperCase() + projectName.slice(1);
  }
}

export default todoPage;