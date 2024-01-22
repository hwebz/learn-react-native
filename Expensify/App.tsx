import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';

// Trouble with tailwindcss@3.4.1 when running the project, should use 3.3.2 instead
// To add google sign in to iOS, add new firebase iOS app and grab GoogleService-Info.plist into project
// and then add REVERSED_CLIENT_ID to Info.plist under URL Schemas
// `cd /ios && pod install` everytime you add new package to React Native project
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
