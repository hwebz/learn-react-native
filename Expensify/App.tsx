import React from 'react';
import AppNavigation from './navigation/appNavigation';

// Trouble with tailwindcss@3.4.1 when running the project, should use 3.3.2 instead
function App(): React.JSX.Element {
  return <AppNavigation />;
}

export default App;
