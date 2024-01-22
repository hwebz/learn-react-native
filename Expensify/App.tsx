import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';

// Trouble with tailwindcss@3.4.1 when running the project, should use 3.3.2 instead
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
