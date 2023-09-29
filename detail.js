const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let tabIngredient = []

console.log(id)

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
            if (key.startsWith("strIngredient") && (value !== "")) {
                tabIngredient[key] = value;
            }
        }
        console.log(tabIngredient)
        let detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = `
        <h1>${data.meals[0].strMeal}</h1>
        <img src="${data.meals[0].strMealThumb}" />
        <div id="ingredients">Ingrédients :</div>
        `
        let ingredients = document.querySelector("#ingredients")

        for (var key in tabIngredient) {
            var value = tabIngredient[key];
            ingredients.innerHTML += `
            <div>
            ${value}
            </div>
            `
        }
        console.log(data.meals)

    } catch (err) {
        console.error(err);
    }
}
displayDetails();