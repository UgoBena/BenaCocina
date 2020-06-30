// API/BenaCocinaBackApi.js

//Recupération de toutes les recettes
export function getRecipesFromAPI () {
  const url = 'https://bena-cocina-back.herokuapp.com/getRecipes';
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupération des recettes en fonction du type de plat
export function getRecipesFromAPIByDishType (dishType) {
  const url = 'https://bena-cocina-back.herokuapp.com/getRecipesByDishType?dishType=' + dishType;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

// Récupération du détail d'une recette
export function getRecipeDetailFromApi (name) {
  const url = 'https://bena-cocina-back.herokuapp.com/getRecipeByName?name=' + name;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

//Ajout d'une recette
export function AddRecipeApi (recipe) {
  const url = 'https://bena-cocina-back.herokuapp.com/addRecipe';
  (async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  });
  const content = await rawResponse.json();

  return content;
  })();
}


//Ajout de commentaire sur une recette
export function AddCommentToRecipe (recipeName,comment) {
  const url = 'https://bena-cocina-back.herokuapp.com/addComment';
  (async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipeName: recipeName, comment: comment})
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
  })();
}
