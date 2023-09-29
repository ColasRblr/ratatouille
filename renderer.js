const btn = document.querySelector('#btn');

const handleSearch = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.categories);
    } catch (err) {
        console.error(err);
    }
};
btn.addEventListener("click", handleSearch)