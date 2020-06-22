// /Store/Reducers/favoriteReducer.js

const initialState = {favorites: []};

function toggleFavorite(state = initialState,action){
  let nextState;
  switch(action.type){
    case "TOGGLE_FAVORITE":
      const favoriteIndex = state.favorites.findIndex(item => item.id === action.value.id);
      if (favoriteIndex !== -1){
        //Le film est déjà dans les favoris, on le supprime
        nextState = {...state,
          favorites: state.favorites.filter((item,index) => index!==favoriteIndex)
        }
      }

      else{
        //Le film n'est pas dans les favoris, on l'ajoute
        console.log(action.value);
        nextState = {...state,
          favorites: [...state.favorites,action.value]
        }
      }
      return nextState || state
  default:
    return state;
  }
}

export default toggleFavorite;