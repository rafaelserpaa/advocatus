document.addEventListener('DOMContentLoaded', function() {
    const toggleFormButton = document.getElementById("toggle-form");
    const backButton = document.getElementById("back-button");
    const expenseForm = document.getElementById("expense-form");
    const overlay = document.getElementById("overlay");

    function showForm() {
        expenseForm.style.display = "block";
        overlay.style.display = "block";
    }

    function hideForm() {
        expenseForm.style.display = "none";
        overlay.style.display = "none";
        expenseForm.reset(); // Reset the form when hiding it
    }

    toggleFormButton.addEventListener("click", showForm);
    backButton.addEventListener("click", hideForm);

    overlay.addEventListener("click", hideForm);

    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Handle form submission here
        hideForm();
    });
});
