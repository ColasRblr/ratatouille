const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let tabIngredient = [];

console.log(id);

const displayDetails = async (e) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const data = await response.json();
    for (const [key, value] of Object.entries(data.meals[0])) {
      if (key.startsWith("strIngredient") && value !== "" && value !== null) {
        tabIngredient[key] = value;
      }
    }
    let detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `

    <h2>${data.meals[0].strMeal}</h2>
      <div class="card">
        <div class="card__header">
          <img src="${data.meals[0].strMealThumb}" alt="card__image" class="card__image" />
        </div>
        <div class="card__body">
          <span class="tag">Ingrédients</span>
          <p id="ingredients"></p>
        </div> 
        <div class="card__footer">
          <span class="tag">Instructions</span>
          <p>${data.meals[0].strInstructions}</p>
        </div>
      </div>

        `;
    let ingredients = document.querySelector("#ingredients");

    for (var key in tabIngredient) {
      var value = tabIngredient[key];
      ingredients.innerHTML += `
      
            <li>
            ${value}
            </li>
           
            `;
    }
    console.log(data.meals);
  } catch (err) {
    console.error(err);
  }
};

displayDetails();