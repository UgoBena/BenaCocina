// App.js

import React from 'react';

import { Provider } from 'react-redux';
import Store from './Store/configureStore'

import Navigation from './Navigation/Navigation';

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}

