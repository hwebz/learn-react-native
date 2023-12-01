import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_700Bold } from '@expo-google-fonts/outfit'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LoginScreen from './App/Screens/LoginScreen'
import Constants from "expo-constants"
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './App/Navigations/TabNavigation'

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    'OutfitRegular': Outfit_400Regular,
    'OutfitMedium': Outfit_500Medium,
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
      <SignedIn>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
      
      <SignedOut>
        <View style={styles.container}>
          <LoginScreen />
        </View>
      </SignedOut>
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
