const btn = document.querySelector('#btn');
const form = document.querySelector('form');
const list = document.querySelector('#list');

const handleSearch = async (e) => {
    const search = document.getElementById('search').value;

    e.preventDefault();
    if(search != '')  {
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

            const data = await response.json();
            console.log(data);
            data.meals.forEach((meal) => {
                console.log(meal);
                let mealContainer = document.createElement("div");
                list.appendChild(mealContainer);
                mealContainer.innerHTML = meal.strMeal;
                let image = document.createElement('img');
                image.src = `${meal.strMealThumb}/preview`;
                mealContainer.appendChild(image);
            }
            )
        } catch (err) {
            console.error(err);
        }
    }
};

form.addEventListener("submit", handleSearch)

