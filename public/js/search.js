document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('location-id').innerText = userData.location;
    document.getElementById('username-id').innerText = userData.username;
    document.getElementById('bio-id').innerText = userData.bio;
});

document.getElementById('search-title-text-id').addEventListener('click', function() {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper.style.display === 'none' || formWrapper.style.display === '') {
        formWrapper.style.display = 'flex';
    } else {
        formWrapper.style.display = 'none';
    }
});



// Search Musicians

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const eventId = document.getElementById('selected-id-id').textContent;
    const location = document.getElementById('location').value;
    const instruments = document.getElementById('instruments').value;
    const storedToken = sessionStorage.getItem('token');
  
    if (!storedToken || !eventId) {
      alert('Data missing! login in.');
    //   window.location.href = 'login.html';
    } else {
      try {
        const response = await fetch('/api/events/search', {
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
  
        const data = await response.json();  // Make sure this is active
  
        if (response.ok) {
          const profilesContainer = document.getElementById('profiles-container-id');
  
          // Clear the container before appending new results
          // profilesContainer.innerHTML = '';
  
          // Check if data has the subprofiles array
          if (data && Array.isArray(data) && data.length > 0) {
            // Loop through each subprofile in the data
            data.forEach(subprofile => {
              // Create the profile-display div
              const profileDisplayDiv = document.createElement('div');
              profileDisplayDiv.classList.add('profile-display');
              profileDisplayDiv.id = `profile-display-${subprofile._id}`;
  
              // Create the profile-details div
              const profileDetailsDiv = document.createElement('div');
              profileDetailsDiv.classList.add('profile-details');
              profileDetailsDiv.id = `profile-details-${subprofile._id}`;
  
              // Profile ID
              const profileIdDiv = document.createElement('div');
              profileIdDiv.classList.add('profile-id');
              profileIdDiv.id = `profile-id-${subprofile._id}`;
              profileIdDiv.textContent = subprofile._id;
  
              // User profile name (username and profile name)
              const userProfileNameDiv = document.createElement('div');
              userProfileNameDiv.classList.add('user-profile-name');
              userProfileNameDiv.id = `user-profile-name-${subprofile._id}`;
  
              const userNameDiv = document.createElement('div');
              userNameDiv.classList.add('user-name');
              userNameDiv.id = `user-name-${subprofile.user._id}`;
              userNameDiv.textContent = subprofile.user.username;
  
              const profileNameDiv = document.createElement('div');
              profileNameDiv.classList.add('profile-name');
              profileNameDiv.id = `profile-name-${subprofile._id}`;
              profileNameDiv.textContent = subprofile.name;
  
              userProfileNameDiv.appendChild(userNameDiv);
              userProfileNameDiv.appendChild(profileNameDiv);
  
              // Phone number
              const phoneContainerDiv = document.createElement('div');
              phoneContainerDiv.classList.add('phone-container');
  
              const phoneLabelDiv = document.createElement('div');
              phoneLabelDiv.classList.add('phone-no');
              phoneLabelDiv.textContent = 'Phone:';
  
              const phoneNoDiv = document.createElement('div');
              phoneNoDiv.classList.add('phone-no');
              phoneNoDiv.id = `phone-no-${subprofile._id}`;
              phoneNoDiv.textContent = subprofile.user.phone;
  
              phoneContainerDiv.appendChild(phoneLabelDiv);
              phoneContainerDiv.appendChild(phoneNoDiv);
  
              // Price and negotiable status
              const priceContainerDiv = document.createElement('div');
              priceContainerDiv.classList.add('price-container');
  
              const priceDisplayDiv = document.createElement('div');
              priceDisplayDiv.classList.add('price-display');
  
              const priceTextDiv = document.createElement('div');
              priceTextDiv.classList.add('price-text');
              priceTextDiv.textContent = 'Price:';
  
              const priceDiv = document.createElement('div');
              priceDiv.classList.add('price');
              priceDiv.id = `price-${subprofile._id}`;
              priceDiv.textContent = subprofile.price;
  
              priceDisplayDiv.appendChild(priceTextDiv);
              priceDisplayDiv.appendChild(priceDiv);
  
              // Negotiable status
              const negotiableContainerDiv = document.createElement('div');
              negotiableContainerDiv.classList.add('negotiable-container');
  
              const negotiableDiv = document.createElement('div');
              negotiableDiv.classList.add('negotiable');
              negotiableDiv.id = `negotiable-${subprofile._id}`;
              negotiableDiv.textContent = 'Negotiable';
  
              const nonNegotiableDiv = document.createElement('div');
              nonNegotiableDiv.classList.add('non-negotiable');
              nonNegotiableDiv.id = `non-negotiable-${subprofile._id}`;
              nonNegotiableDiv.textContent = 'Non negotiable';
  
              // Display only one based on subprofile.negotiable
              if (subprofile.negotiable) {
                negotiableDiv.style.display = 'block';
                nonNegotiableDiv.style.display = 'none';
              } else {
                negotiableDiv.style.display = 'none';
                nonNegotiableDiv.style.display = 'block';
              }
  
              // Append both to negotiableContainerDiv, but only one will be visible
              negotiableContainerDiv.appendChild(negotiableDiv);
              negotiableContainerDiv.appendChild(nonNegotiableDiv);
  
              priceContainerDiv.appendChild(priceDisplayDiv);
              priceContainerDiv.appendChild(negotiableContainerDiv);
  
              // See portfolio button
              const portfolioBtn = document.createElement('button');
              portfolioBtn.classList.add('see-portfolio-btn');
              portfolioBtn.id = `see-portfolio-btn-${subprofile._id}`;
              portfolioBtn.textContent = 'See portfolio';
  
              // Append all the details to profile-details
              profileDetailsDiv.appendChild(profileIdDiv);
              profileDetailsDiv.appendChild(userProfileNameDiv);
              profileDetailsDiv.appendChild(phoneContainerDiv);
              profileDetailsDiv.appendChild(priceContainerDiv);
              profileDetailsDiv.appendChild(portfolioBtn);
  
              // Create the engage-container div
              const engageContainerDiv = document.createElement('div');
              engageContainerDiv.classList.add('engage-container');
              engageContainerDiv.id = `engage-container-${subprofile._id}`;
  
              // Pending button
              const pendingBtn = document.createElement('button');
              pendingBtn.classList.add('pending-btn');
              pendingBtn.id = `pending-btn-${subprofile._id}`;
              pendingBtn.textContent = 'Add to list';
  
              // Hire button
              const hireBtn = document.createElement('button');
              hireBtn.classList.add('hire-btn');
              hireBtn.id = `hire-btn-${subprofile._id}`;
              hireBtn.textContent = 'Hire';
  
              // Append buttons to engage-container
              engageContainerDiv.appendChild(pendingBtn);
              engageContainerDiv.appendChild(hireBtn);
  
              // Append profile-details and engage-container to profile-display
              profileDisplayDiv.appendChild(profileDetailsDiv);
              profileDisplayDiv.appendChild(engageContainerDiv);
  
              // Append the profile-display to profiles-container
              profilesContainer.appendChild(profileDisplayDiv);
            });
          } else {
            console.log('No subprofiles found.');
          }
        } else {
          console.error('Failed to fetch:', data.message);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching for musicians.');
      }
    }
});

