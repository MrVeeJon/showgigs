// Retrieving data from storage
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from session storage
    const userData = JSON.parse(sessionStorage.getItem('user'));

    if (userData && userData.events) {
        const events = userData.events;

        // Get the container where the events will be appended
        const eventsContainer = document.querySelector('.events-container');

        // Loop through each event and create the necessary HTML structure
        events.forEach(event => {
            // Create the main event-display div
            const eventDisplayDiv = document.createElement('div');
            eventDisplayDiv.classList.add('event-display');
            eventDisplayDiv.id = 'event-display-id';

            // Create the event-details div
            const eventDetailsDiv = document.createElement('div');
            eventDetailsDiv.classList.add('event-details');
            eventDetailsDiv.id = 'event-details-id';

            // Create the event-name div and populate it
            const eventNameDiv = document.createElement('div');
            eventNameDiv.classList.add('event-name');
            eventNameDiv.id = 'event-name-id';
            eventNameDiv.textContent = event.name;

            // Create the event-description div and populate it
            const eventDescriptionDiv = document.createElement('div');
            eventDescriptionDiv.classList.add('event-description');
            eventDescriptionDiv.id = 'event-description-id';
            eventDescriptionDiv.textContent = event.description;

            // Create the event-date div and populate it
            const eventDateDiv = document.createElement('div');
            eventDateDiv.classList.add('event-date');
            eventDateDiv.id = 'event-date-id';
            eventDateDiv.textContent = event.date;

            // Create the event-id div and populate it
            const eventIdDiv = document.createElement('div');
            eventIdDiv.classList.add('event-id');
            eventIdDiv.id = 'event-id-id';
            eventIdDiv.textContent = event._id;

            // Create the checkout-btn button
            const checkoutBtn = document.createElement('button');
            checkoutBtn.classList.add('checkout-btn');
            checkoutBtn.id = 'checkout-btn-id';
            checkoutBtn.textContent = 'Checkout';

            // Append all elements to the event-details div
            eventDetailsDiv.appendChild(eventNameDiv);
            eventDetailsDiv.appendChild(eventDescriptionDiv);
            eventDetailsDiv.appendChild(eventDateDiv);
            eventDetailsDiv.appendChild(eventIdDiv);
	    eventDetailsDiv.appendChild(checkoutBtn);

            // Create the markings div
	    const markingsDiv = document.createElement('div');
	    markingsDiv.classList.add('markings');
            markingsDiv.id = 'markings-id';

            // Create the todo button
            const todoBtn = document.createElement('button');
            todoBtn.classList.add('todo');
            todoBtn.id = 'todo-id';
            todoBtn.textContent = 'To Do';
            // Create the done-div div
	    const doneDiv = document.createElement('div');
            doneDiv.classList.add('done-div');
            doneDiv.id = 'done-div-id';

            // Create the done-btn button
            const doneBtn = document.createElement('button');
            doneBtn.classList.add('done-btn');
            doneBtn.id = 'done-btn-id';
            doneBtn.textContent = 'Done';

            // Create the check icon
            const checkIcon = document.createElement('i');
            checkIcon.classList.add('fa-solid', 'fa-check');
            checkIcon.id = 'fa-check-id';

            // Append the done-btn and check icon to the done-div
            doneDiv.appendChild(doneBtn);
            doneDiv.appendChild(checkIcon);

            // Append the todo button and done-div to the markings div
            markingsDiv.appendChild(todoBtn);
            markingsDiv.appendChild(doneDiv);

            // Append the event-details and markings divs to the event-display div
            eventDisplayDiv.appendChild(eventDetailsDiv);
            eventDisplayDiv.appendChild(markingsDiv);

            // Finally, append the event-display div to the events-container
            eventsContainer.appendChild(eventDisplayDiv);
        });

        document.getElementById('location-id').innerText = userData.location;
        document.getElementById('username-id').innerText = userData.username;
        document.getElementById('bio-id').innerText = userData.bio;
    } else {
        console.error('No events found or user data missing.');
    }
});


// Toggling the Event form
document.getElementById('event-title-text-id').addEventListener('click', function() {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper.style.display === 'none' || formWrapper.style.display === '') {
        formWrapper.style.display = 'flex';
    } else {
        formWrapper.style.display = 'none';
    }
});

// Create events
document.getElementById('create-event-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const storedToken = sessionStorage.getItem('token');
  
    if (!storedToken) {
      alert('You must be logged in to create an event.');
      window.location.href = 'login.html';
    } else {
      try {
        const response = await fetch('/api/events', {
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
          // Parse userData from sessionStorage
          let userData = JSON.parse(sessionStorage.getItem('user'));
          
          if (userData.events) {
            // Prepend the new event to the existing events array
            userData.events.unshift(data.event);
          } else {
            // Initialize the events array with the new event if it doesn't exist
            userData.events = [data.event];
          }
  
          // Update sessionStorage with the modified userData
          sessionStorage.setItem('user', JSON.stringify(userData));
  
          alert(`${data.event.name} created successfully!`);
          window.location.href = 'event.html';
  
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the event.');
      }
    }
  });
  




// Taking event details to search page
document.getElementById('events-container-id').addEventListener('click', function(event) {
    if (event.target.classList.contains('checkout-btn')) {
        const eventDetails = event.target.closest('.event-details');
        const eventName = eventDetails.querySelector('.event-name').innerText;
        const eventDescription = eventDetails.querySelector('.event-description').innerText;
        const eventDate = eventDetails.querySelector('.event-date').innerText;
        const eventId = eventDetails.querySelector('.event-id').innerText;

        const newWindow = window.open('search.html');
        newWindow.onload = function() {
            newWindow.document.getElementById('selected-name-id').innerText = eventName;
            newWindow.document.getElementById('selected-description-id').innerText = eventDescription;
            newWindow.document.getElementById('selected-date-id').innerText = eventDate;
            newWindow.document.getElementById('selected-id-id').innerText = eventId;
        };
    }
});
