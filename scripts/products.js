function retrieveUserSelection() {
  const userSelection = localStorage.getItem("userSelection");
  return userSelection
    ? JSON.parse(userSelection)
    : { selectedDiet: [], selectedOrganic: "", userCharacteristics: "" };
}

async function displayArticles() {
  const { selectedDiet, selectedOrganic } = retrieveUserSelection();
  console.log(selectedDiet);

  const articlesContainer = document.getElementById("products");
  articlesContainer.innerHTML = ""; // Clear previous content

  // Display current diet preference text
  const currentDietText = document.getElementById("current-diet");
  currentDietText.textContent = `Your current diet preferences are: ${selectedDiet.join(
    ", "
  )}`;

  try {
    const response = await fetch("products.json");
    const productsData = await response.json();

    for (const category in productsData.products) {
      for (const product of productsData.products[category]) {
        // Check if the product matches any selected diet
        // Check if the product matches all selected diets
        const matchesSelectedDiets = selectedDiet.every((diet) => {
          // Check if the product satisfies the current selected diet
          switch (diet) {
            case "None":
              return true; // No dietary restrictions
            case "Lactose-free":
              return product.lactoseFree === "true";
            case "Gluten-Free":
              return product.glutenFree === "true";
            case "Vegetarian":
              return product.vegetarian === "true";
            default:
              return false; // Invalid diet
          }
        });

        // Check if the product matches the selected organic preference
        const matchesOrganicPreference =
          selectedOrganic === "All" || product.organic === selectedOrganic;

        // Display the product if it matches all selected diets and the organic preference
        if (matchesSelectedDiets && matchesOrganicPreference) {
          const articleElement = document.createElement("article");
          articleElement.innerHTML = `
                      <img src="${product.image}" id="image">
                      <h2 id="name">${product.name}</h2>
                      <p id="description">${product.description}</p>
                      <p id="price">${product.price}</p>
                      <button id="add-cart" onclick="addToCart()">Add to cart</button>
                  `;
          articlesContainer.appendChild(articleElement);
        }
      }
    }
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

displayArticles();
