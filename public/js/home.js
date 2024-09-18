document.getElementById('icon-button-id').addEventListener('click', function () {
    var fieldDiv = document.getElementById('instrument-and-button-id');
    if (fieldDiv.style.right === '0px') {
        fieldDiv.style.right = '-180px'; // Slide out to the right
    } else {
        fieldDiv.style.right = '0px'; // Slide in from the right
    }
});

