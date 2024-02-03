// Add event listener to trigger storing user selection when the selection changes
document
  .getElementById("dietSelect")
  .addEventListener("change", storeUserSelection);
document
  .getElementById("organicSelect")
  .addEventListener("change", storeUserSelection);

// Function to store user selections in localStorage
function storeUserSelection() {
  // Get selected values from checkboxes and select dropdown
  var selectedDiet = [];
  var checkboxes = document.querySelectorAll(
    '#diet input[type="checkbox"]:checked'
  );
  checkboxes.forEach(function (checkbox) {
    selectedDiet.push(checkbox.value);
  });
  var selectedOrganic = document.getElementById("organicSelect").value;
  var userCharacteristics = document.getElementById(
    "userCharacteristics"
  ).value;

  // Store selected values in localStorage as an object
  localStorage.setItem(
    "userSelection",
    JSON.stringify({
      selectedDiet: selectedDiet,
      selectedOrganic: selectedOrganic,
      userCharacteristics: userCharacteristics,
    })
  );
}

// Function to populate user selections when the page loads
function populateUserSelection() {
  // Retrieve stored values from localStorage
  var storedDiet = JSON.parse(localStorage.getItem("selectedDiet"));
  var storedOrganic = localStorage.getItem("selectedOrganic");
  var storedCharacteristics = localStorage.getItem("userCharacteristics");

  // Set checkboxes and select dropdown to stored values
  if (storedDiet) {
    storedDiet.forEach(function (value) {
      document.querySelector(
        '#diet input[value="' + value + '"]'
      ).checked = true;
    });
  }
  if (storedOrganic) {
    document.getElementById("organicSelect").value = storedOrganic;
  }
  if (storedCharacteristics) {
    document.getElementById("userCharacteristics").value =
      storedCharacteristics;
  }
}

// Call populateUserSelection when the page loads
window.onload = populateUserSelection;
