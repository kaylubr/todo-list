export default function ScreenController() {
  const navItems = document.querySelectorAll('.nav-item');
  const content = document.querySelector('#content');

  navItems.forEach(item => {
    item.addEventListener('click', event => {
      const sectionName = event.currentTarget.id;
      
      if (!sectionName) {
        return;
      }

      // Resets the content every navigation
      content.textContent = '';

      switch(sectionName) {
        case 'today':
          console.log('today');
          break;
        case 'tommorow':
          console.log('tommorow');
          break;
        case 'month':
          console.log('month');
          break;
        case 'upcoming':
          console.log('upcoming');
          break;
        case 'completed':
          console.log('completed');
          break; 
        default:
          break; 
      }

    });
  });
}