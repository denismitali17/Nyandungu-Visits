// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const destination = document.getElementById('destination').value;

    // Simple client-side validation
    if (name && email && destination) {
        alert(`Thank you, ${name}! Your request for ${destination} has been submitted.`);
    } else {
        alert('Please fill in all fields.');
    }
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});