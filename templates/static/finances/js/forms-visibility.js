document.addEventListener("DOMContentLoaded", function () {
  const toggleFormButton = document.getElementById("toggle-form");
  const expenseForm = document.getElementById("expense-form");
  const overlay = document.getElementById("overlay");

  function showForm() {
    expenseForm.style.display = "block";
    overlay.style.display = "block";
  }

  function hideForm() {
    expenseForm.style.display = "none";
    overlay.style.display = "none";
    expenseForm.reset(); // Reseta o formulário quando ele é escondido
  }

  toggleFormButton.addEventListener("click", showForm);
  overlay.addEventListener("click", hideForm);

  // Remova o preventDefault se deseja que o formulário seja realmente enviado ao backend
  expenseForm.addEventListener("submit", function (event) {
    hideForm();
  });
});
