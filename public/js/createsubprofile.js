// Querries the endpoint to create subprofile

document.getElementById('create-subprofile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('subprofile-name').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/subprofiles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Sub-profile: ${data.subprofile.name} created, login again to see`);
        appendSubprofileToDOM(data.subprofile);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the subprofile.');
    }
  });
  
