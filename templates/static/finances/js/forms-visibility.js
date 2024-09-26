document.getElementById("toggle-form").addEventListener("click", function () {
  var form = document.getElementById("expense-form");
  var overlay = document.getElementById("overlay");
  var closeButton = document.getElementById("close-form");
  var addButton = document.getElementById("toggle-form");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    overlay.style.display = "block";
    addButton.style.display = "none";
    closeButton.style.display = "block";
  }
});

document.getElementById("close-form").addEventListener("click", function () {
  var form = document.getElementById("expense-form");
  var overlay = document.getElementById("overlay");
  var closeButton = document.getElementById("close-form");
  var addButton = document.getElementById("toggle-form");

  form.style.display = "none";
  overlay.style.display = "none";
  closeButton.style.display = "none";
  addButton.style.display = "block";
});
