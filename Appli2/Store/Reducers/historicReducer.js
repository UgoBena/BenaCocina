const initialState = {
  historicFilms: []
}

function manageHistoricFilms(state = initialState, action) {
  let nextState={...state};
  var historicIndex;
  switch(action.type){
    case "TOGGLE_FILMDETAIL":
      historicIndex = state.historicFilms.findIndex(item => item.id == action.value.id);
      //check if film is not already in historic
      if( historicIndex === -1){
        nextState.historicFilms.push(action.value);
      }
      return nextState;

    case "REMOVE_HISTORIC_FILM":
      historicIndex = state.historicFilms.findIndex(item => item.id == action.value.id);
      nextState.historicFilms=state.historicFilms.filter((item,index)=>index!==historicIndex);
      return nextState;

    case "RESET_HISTORIC":
      nextState.historicFilms.length=0;
      return nextState
    default:
      return state
  }

}

export default manageHistoricFilms
