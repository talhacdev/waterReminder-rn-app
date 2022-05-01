import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import DrinkUnitScreen from '../screens/DrinkUnitScreen';
import DrawerNavigator from '../navigation/DrawerNavigator';

const Stack = createStackNavigator();

const DailyGoalNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="DrinkUnit" component={DrinkUnitScreen} />
    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
  </Stack.Navigator>
);

export default DailyGoalNavigator;
