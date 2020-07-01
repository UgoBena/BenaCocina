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
  const imageUploadUrl = 'https://bena-cocina-back.herokuapp.com/addImages';
  console.log(recipe)
  //First upload the images to the server
  var data = new FormData();
  data.append('main_image', {
      uri: recipe.imageUri.uri,
      name: recipe.name + '.jpg',
      type: 'image/jpg'
  });
  //update recipe to send with the server uri of the image

  for (var i =0; i<recipe.steps.length;i++){
    if(recipe.steps[i].image !== ""){
      data.append('step_image_'+i.toString(),{
        uri: recipe.steps[i].image.uri,
        name: recipe.name + 'step' + i.toString() + '.jpg',
        type: 'image/jpg'
      });
    }
  }

   /*(async () => {
    const rawResponse = await fetch(imageUploadUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST',
    body: data
  });

  const content = await rawResponse.json();
  console.log(content);
  return content;
  })
*/


  //then send the recipe data
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
