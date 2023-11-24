import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit'
import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from './App/Screens/LoginScreen'
import Constants from "expo-constants"
import { ClerkProvider } from '@clerk/clerk-expo'

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    'OutfitRegular': Outfit_400Regular,
    'OutfitBold': Outfit_700Bold
  })

  if (!fontsLoaded && !fontsError) {
    return (
      <View style={styles.container}>
        <Text>Failed to load fonts</Text>
      </View>
    )
  }

  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <View style={styles.container}>
        <LoginScreen />
      </View>
    </ClerkProvider>
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
