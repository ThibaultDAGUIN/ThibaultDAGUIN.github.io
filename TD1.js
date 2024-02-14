// Fonction pour afficher la météo de la ville sélectionnée
function afficheVille() {
    let selectVille = document.getElementById("selectVille");
    let nomVilleChoisie = selectVille.value;
    let villes = document.querySelectorAll(".MeteoVille");

    villes.forEach(function(ville) {
        if (ville.id === nomVilleChoisie) {
            ville.style.display = "block";
        } else {
            ville.style.display = "none";
        }
    });
}


function fetchWeatherData() {
    let apiKey = 'eccf8200898239c01b81626293da9f1d';
    let villes = ["niort", "auxerre", "tourcoing", "la rochelle"];

    villes.forEach(function(ville) {
        let villeId = ville.replace(/\s+/g, '-'); // Remplacer les espaces par des tirets dans l'ID

        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&lang=fr`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Récupérer les données météorologiques nécessaires
                let temperature = Math.round(data.main.temp - 273.15); // Convertir la température en Celsius
                let description = traduireMeteo(data.weather[0].description); // Traduire la description de la météo
                let iconCode = data.weather[0].icon;

                // Mettre à jour l'affichage sur la page pour la ville spécifique
                let villeElement = document.getElementById(villeId);
                villeElement.querySelector(".temp").innerText = `${temperature}°C`;
                villeElement.querySelector(".description").innerText = description;
                villeElement.querySelector(".img").src = `http://openweathermap.org/img/w/${iconCode}.png`;
            })
            .catch(error => console.error(`Erreur lors de la récupération des données météorologiques pour ${ville} :`, error));
    });
}



// Fonction de traduction des descriptions de la météo en français
function traduireMeteo(description) {
    const traductions = {
        "clear sky": "ciel dégagé",
        "few clouds": "quelques nuages",
        "scattered clouds": "nuages épars",
        "broken clouds": "nuages fragmentés",
        "overcast clouds": "ciel couvert",
        "light rain": "pluie légère",
        "moderate rain": "pluie modérée",
        "heavy intensity rain": "fortes pluies",
        "thunderstorm": "orage",
        "snow": "neige",
        "mist": "brume"
    };

    return traductions[description.toLowerCase()] || description;
}


function fetchWeatherData2() {
    let apiKey = 'eccf8200898239c01b81626293da9f1d';
    let villes = ["niort", "la rochelle","tourcoing"];

    villes.forEach(function(ville) {
        // Remplacer les espaces par le trait d'union dans l'identifiant
        let villeId = ville.replace(/ /g, "_");
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Récupérer les données météorologiques nécessaires
                let temperature = Math.round(data.main.temp - 273.15); // Convertir la température en Celsius
                let description = data.weather[0].description;
                let iconCode = data.weather[0].icon;

                // Mettre à jour l'affichage sur la page pour la ville spécifique
                document.getElementById(`${ville}-temp`).innerText = `${temperature}°C`;
                document.getElementById(`${ville}-description`).innerText = description;
                document.getElementById(`${ville}-img`).src = `http://openweathermap.org/img/w/${iconCode}.png`;
            })
            .catch(error => console.error(`Erreur lors de la récupération des données météorologiques pour ${ville} :`, error));
    });
}


// Appeler la fonction fetchWeatherData() au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    afficheVille(); // Afficher la météo de la ville initiale
    fetchWeatherData(); // Récupérer les données météorologiques
});

