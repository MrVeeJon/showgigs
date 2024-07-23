// queries the search endpoint for musicians based on event location

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const eventId = localStorage.getItem('user.events[0]._id');
  const location = document.getElementById('location').value;
  const instruments = document.getElementById('instruments').value;
  const storedToken = localStorage.getItem('token');

  if (!storedToken || !eventId) {
    alert('You must be logged in to search for musicians.');
    window.location.href = 'login.html';
  } else {
    try {
      const response = await fetch('http://localhost:3000/api/events/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          eventId,
          location,
          instruments
        }),
      });

      const data = await response.json();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (response.ok) {
        document.getElementById('search-result').textContent = 'Search result';
        data.forEach(subprofile => {
          const subprofileDiv = document.createElement('div');
          subprofileDiv.innerHTML = `
            <p>${subprofile.name}, Price: ${subprofile.price}</p>
            <p>My name is: ${subprofile.user.username}</p>
            <p>${subprofile.user.bio}</p>
            <p>Contact me on: ${subprofile.user.phone}</p>
            <hr>
          `;
          resultsDiv.appendChild(subprofileDiv);
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while searching for musicians.');
    }
  }
});

