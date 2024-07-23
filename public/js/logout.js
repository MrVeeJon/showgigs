// clears the browser local storage of credentials

document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('event');
  alert('You have been logged out.');
  window.location.href = 'login.html';
});

