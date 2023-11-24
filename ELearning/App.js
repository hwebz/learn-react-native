import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'OutfitLight': require('./assets/fonts/Outfit-Light.ttf'),
    'OutfitRegular': require('./assets/fonts/Outfit-Regular.ttf'),
    'OutfitMedium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'OutfitBold': require('./assets/fonts/Outfit-Bold.ttf')
  })
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
