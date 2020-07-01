// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import manageHistoricFilms from './Reducers/historicReducer';


export default createStore(toggleFavorite);