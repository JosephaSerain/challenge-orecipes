const express = require("express");
const path = require("path");
const recipes = require("./data/recipes");

const app = express();
const port = 3000;

// Configure EJS comme moteur de templates
app.set('view engine', 'ejs');
// Définit le dossier des views ⇒ express ira chercher les fichiers ejs dans le dossier views par défaut
app.set('views', path.join(__dirname, 'views'));

// Définit le dossier public comme dossier statique ⇒ l'endroit où express ira chercher les fichiers statiques (css, js, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    // La fonction render va non seulement récupérer le fichier EJS qui nous interesse, mais aussi exécuter le code JS
    // dedans, afin qu'on se retrouve au final avec un pur HTML qu'on pourra renvoyer au client.
    res.render('recipes', { recipes });
});

app.get("/recipes/:recipeName", (req, res) => {
    // On récupère LA bonne recette en fonction de ce qu'on a en paramètre de l'URL
    const recipe = recipes.find(recipe => recipe.name.toLowerCase() === req.params.recipeName.toLowerCase());

    // Si aucune recette n'est trouvée, on renvoie une erreur 404
    if (!recipe) {
        return res.status(404).send("Recette non trouvée");
    }

    res.render("recipe", { recipe });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});