// Store in client's local storage,
// ... the user's info for personalized experiece

function appendSubprofileToDOM(subprofile) {
    const subprofileSection = document.getElementById('subprofile-section');
    if (!subprofileSection) {
      console.error('Subprofile section element not found');
      return;
    }
  
    const subprofileDiv = document.createElement('div');
    subprofileDiv.className = 'subprofile';
    subprofileDiv.innerHTML = `
      <p>Sub-profile: ${subprofile.name}</p>
      <p>Location: ${subprofile.location}</p>
      <p>Price: ${subprofile.price}</p>
      <p>Negotiable: ${subprofile.negotiable}</p>
    `;
    subprofileSection.appendChild(subprofileDiv);
  }
  
