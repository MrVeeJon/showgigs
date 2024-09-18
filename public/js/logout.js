document.getElementById('logout-btn-id').addEventListener('click', () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  alert('You have been logged out.');
  window.location.href = 'login.html';
});

