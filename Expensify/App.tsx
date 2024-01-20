import React from 'react';
import {Text, View} from 'react-native';

// Trouble with tailwindcss@3.4.1 when running the project, should use 3.3.2 instead
function App(): React.JSX.Element {
  return (
    <View className="bg-red-400">
      <Text className="text-white">Test 123123</Text>
    </View>
  );
}

export default App;
