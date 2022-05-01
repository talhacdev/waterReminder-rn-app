import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ReminderScreen from '../screens/ReminderScreen';

const Drawer = createDrawerNavigator();

import DrawerContent from './DrawerContent';

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {width: '66%'},
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Reminder" component={ReminderScreen} />
      <Drawer.Screen name="Statistics" component={StatisticsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
