// Querries endpoint to create event

document.getElementById('create-event-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const storedToken = localStorage.getItem('token');

  if (!storedToken) {
    alert('You must be logged in to create an event.');
    window.location.href = 'login.html';
  } else {
    console.log(storedToken);
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          name,
          description,
          location,
          date
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('event', JSON.stringify(data.event));
        alert(`${data.event.name} created successfully!`);
        window.location.href = 'eventpage.html';
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the event.');
    }
  }
});

