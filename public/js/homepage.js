// Retrieves stored data from browser local storage
// ... stored during login, for personalized experience

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('username').innerText = user.username;
    document.getElementById('bio').innerText = user.bio;

    const eventsContainer = document.getElementById('events');
    user.events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event-item');
      eventDiv.innerHTML = `
        <p>${event.name} - ${new Date(event.date).toLocaleDateString()}</p>
        <p>${event.description}</p>
        <p>${event.location}</p>
      `;
      eventsContainer.appendChild(eventDiv);
    });

    const subprofilesContainer = document.getElementById('subprofile-section');
    user.subprofiles.forEach(subprofile => {
      appendSubprofileToDOM(subprofile);
    });
  } else {
    alert('No user data found. Please log in.');
    window.location.href = 'login.html';
  }
});

