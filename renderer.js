const btn = document.querySelector('#btn');
const form = document.querySelector('form');
const list = document.querySelector('#list');

const handleSearch = async (e) => {
    const search = document.getElementById('search').value;

    e.preventDefault();
    if (search != '') {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            list.innerHTML = "";
            const data = await response.json();
            data.meals.forEach((meal) => {
                console.log(meal);
                list.innerHTML += `
                <div id="${meal.idMeal}" class="meal-container" href="detail.html/${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="meal-container-image" />
                    <div class="meal-container-info">
                        <h2>${meal.strMeal}</h2>
                        <div>Location : ${meal.strArea}</div>
                        <div>Category : ${meal.strCategory}</div>
                    </div>
                </div>
                `})


            mealCards = document.querySelectorAll('.meal-container');
            mealCards.forEach((card) => {
                card.addEventListener("click", () => {
                    let cardId = card.id
                    window.open(`detail.html?id=${cardId}`)
                })
            })
        } catch (err) {
            console.error(err);
        }
    }
};

form.addEventListener("submit", handleSearch)
