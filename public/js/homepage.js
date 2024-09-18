document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if(user) {
    const firstSubprofile = user.subprofiles[0];
        document.getElementById('field-name-id').textContent = firstSubprofile.name;
        const priceDiv = document.getElementById('price-id');
        priceDiv.textContent = firstSubprofile.price;
        const activeDiv = document.getElementById('active-id');
        if (firstSubprofile.isActive) {
            activeDiv.textContent = 'Active';
            activeDiv.style.backgroundColor = 'green';
        } else {
            activeDiv.textContent = 'Inactive';
            activeDiv.style.backgroundColor = 'red';
        }

        const negotiableDiv = document.getElementById('negotiable-id');
        if (firstSubprofile.negotiable) {
            negotiableDiv.textContent = 'Negotiable';
            negotiableDiv.style.backgroundColor = 'green';
        } else {
            negotiableDiv.textContent = 'Non negotiable';
            negotiableDiv.style.backgroundColor = 'red';
        }
  }
})


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from session storage
    const userData = JSON.parse(sessionStorage.getItem('user'));
  
    if (userData && userData.subprofiles) {
        const subprofiles = userData.subprofiles;

        // Get the container where the instruments will be appended
        const instrumentsContainer = document.querySelector('.instruments-container');
  
        // Loop through each subprofile and create the necessary HTML structure
        subprofiles.forEach(subprofile => {
            const instrumentsDiv = document.createElement('div');
            instrumentsDiv.classList.add('instruments');
            instrumentsDiv.id = 'instruments-id';
  
            const notificationBoxDiv = document.createElement('div');
            notificationBoxDiv.classList.add('notification-box');
            // Add content to notificationBoxDiv if needed
  
            const instrumentNameDiv = document.createElement('div');
            instrumentNameDiv.classList.add('instrument-name');
            instrumentNameDiv.textContent = subprofile.name;
  
            instrumentsDiv.appendChild(notificationBoxDiv);
            instrumentsDiv.appendChild(instrumentNameDiv);
  
                // Attach click event listener to the instrumentNameDiv
            instrumentNameDiv.addEventListener('click', () => {
                    // Update the text content of the field-name div
                document.getElementById('field-name-id').textContent = subprofile.name;
  
                    // Remove underline from all instrument-name divs
                document.querySelectorAll('.instrument-name').forEach(div => {
                    div.style.textDecoration = 'none';
                });
  
                // Underline the clicked instrument name
                instrumentNameDiv.style.textDecoration = 'underline';
  
                const priceActiveContainer = document.querySelector('.price-active-container');
                priceActiveContainer.style.display = 'flex'; // Make the container visible
  
                // Update the price div with the subprofile's price
                const priceDiv = document.getElementById('price-id');
                priceDiv.textContent = subprofile.price;
  
                // Update the active div with status and background color
                const activeDiv = document.getElementById('active-id');
                if (subprofile.isActive) {
                    activeDiv.textContent = 'Active';
                    activeDiv.style.backgroundColor = 'green';
                } else {
                    activeDiv.textContent = 'Inactive';
                    activeDiv.style.backgroundColor = 'red'; // A suitable color for inactive
                }

                const negotiableDiv = document.getElementById('negotiable-id');
                if (subprofile.negotiable) {
                    negotiableDiv.textContent = 'Negotiable';
                    negotiableDiv.style.backgroundColor = 'green';
                } else {
                    negotiableDiv.textContent = 'Non negotiable';
                    negotiableDiv.style.backgroundColor = 'red';
                }
            });
  
            instrumentsContainer.appendChild(instrumentsDiv);
        });
  
        document.getElementById('location-id').innerText = userData.location;
        document.getElementById('username-id').innerText = userData.username;
        document.getElementById('bio-id').innerText = userData.bio;
    } else {
        console.error('No subprofiles found or user data missing.');
    }
});

// Create Subprofiles

document.querySelector('.add-button').addEventListener('click', () => {
    const form = document.getElementById('create-subprofile-form');
    form.classList.toggle('hidden');
    form.classList.toggle('visible');
});

document.getElementById('create-subprofile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    alert('Form submission prevented');
    const name = document.getElementById('subprofile-name').value;
    // const token = sessionStorage.getItem('token');

    try {
        const response = await fetch('/api/subprofiles/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();

        if (response.ok) {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            userData.subprofiles.push(data.subprofile);
            sessionStorage.setItem('user', JSON.stringify(userData));

            alert(`Sub-profile: ${data.subprofile.name} created`);
            window.location.href = 'home.html';

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the subprofile.');
    }
});


// Adding event listener to all elements with the class 'instrument-name'
document.querySelectorAll('.instrument-name').forEach(instrumentNameDiv => {
    instrumentNameDiv.addEventListener('click', (event) => {
        // Update the text content of the field-name div
        const fieldName = event.target.textContent;
        document.getElementById('field-name-id').textContent = fieldName;

        // Remove underline from all instrument-name divs
        document.querySelectorAll('.instrument-name').forEach(div => {
            div.style.textDecoration = 'none';
        });

        // Underline the clicked instrument name
        event.target.style.textDecoration = 'underline';
    });
});

// Hamburger icon event listener for media querry small screens
document.getElementById('icon-button-id').addEventListener('click', function () {
    var fieldDiv = document.getElementById('instrument-and-button-id');
    if (fieldDiv.style.right === '0px') {
        fieldDiv.style.right = '-180px'; // Slide out to the right
    } else {
        fieldDiv.style.right = '0px'; // Slide in from the right
    }
});

// Update location

document.getElementById('set-location-button').addEventListener('click', () => {
    const form = document.getElementById('set-location-form');
    form.classList.toggle('hidden');
    form.classList.toggle('visible');
});

document.getElementById('location-form-id').addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = document.getElementById('location-text-id').value;

    try {
        const response = await fetch('/api/location/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ location })
        });

        if (response.ok) {
            const data = await response.json();
            const updatedUser = data.user;
          
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
          
            alert('Location updated for user and all subprofiles');
            window.location.href = 'home.html';
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('error: ', error);
        alert('An error occurred while updating location');
    }
});

// Update subprofile price

document.getElementById('set-price-button').addEventListener('click', () => {
    const form = document.getElementById('set-price-form');
    form.classList.toggle('hidden');
    form.classList.toggle('visible');
});

document.getElementById('price-form-id').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('field-name-id').textContent;
    if(!name) {
        alert('Select a field to update');
    }

    const price = document.getElementById('price-text-id').value;
  
    try {
      const response = await fetch('/api/subprofiles/updatePrice', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, price })
      });
  
      if (response.ok) {
        const data = await response.json();
        const updatedSubprofile = data.subprofile;
  
        // Retrieve the user from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
  
        // Find the subprofile in the user's subprofiles array and update the price
        const subprofileIndex = user.subprofiles.findIndex(sp => sp._id === updatedSubprofile._id);
        if (subprofileIndex !== -1) {
          user.subprofiles[subprofileIndex].price = updatedSubprofile.price;
        }
  
        // Store the updated user back in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user));
  
        alert('Price updated successfully for the subprofile');

        window.location.href = 'home.html';
        
      } else {
        const errorData = await response.json();
        alert(errorData.msg || 'Failed to update price');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the price');
    }
});

