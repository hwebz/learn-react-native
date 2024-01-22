import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {useDispatch, useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';
import {setUser} from '../redux/slices/user';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, async (u: any) => {
    console.log('user', u);
    await dispatch(setUser(u));
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {!user ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false, presentation: 'modal'}}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{headerShown: false, presentation: 'modal'}}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AddTrip"
              component={AddTripScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AddExpense"
              component={AddExpenseScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="TripExpenses"
              component={TripExpensesScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
