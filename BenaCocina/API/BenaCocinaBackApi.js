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
  const mainImageUploadUrl = 'https://bena-cocina-back.herokuapp.com/uploadMainPhoto';
  const stepImageUploadUrl = 'https://bena-cocina-back.herokuapp.com/uploadStepPhoto';
  

  //first send the recipe data
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
  /*if (content.errors){
    console.log("erros:");
    console.log(content.errors)
    return content.errors;
  } */

  var data = new FormData();
  //then upload the main image to the server
  if (recipe.imageUri !== undefined){
    data.append('main_image', {
        uri: recipe.imageUri,
        name: recipe.name + '.jpg',
        type: 'image/jpg'
    });

    console.log(data._parts);
    
    fetch(mainImageUploadUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: data._parts
      }).catch( (err) => console.log(err));
      
    
  }



  //then upload the image for each steps that contain one
  for (var i =0; i<recipe.steps.length;i++){
    if(recipe.steps[i].image !== ""){
      data = new FormData();
      data.append('step_image',{
        uri: recipe.steps[i].image.uri,
        name: recipe.name + 'step' + i.toString() + '.jpg',
        type: 'image/jpg',
      });
      data.append('step',i);
      data.append("recipeName",recipe.name);

      fetch(stepImageUploadUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: data
      });
    }
  }
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
