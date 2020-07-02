// App.js

import React from 'react';

import { Provider } from 'react-redux';
import Store from './Store/configureStore'

import Navigation from './Navigation/Navigation';

export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}

