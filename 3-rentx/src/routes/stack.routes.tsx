import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import { Splash } from '../screens/Splash';

import { Home } from '../screens/Home';

import { CarDetails } from '../screens/CarDetails';
import { MyCars } from '../screens/MyCars';

import { Scheduling } from '../screens/Scheduling';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
      />

      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen
        name="CarDetails"
        component={CarDetails}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />

      <Screen
        name="Scheduling"
        component={Scheduling}
      />

      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
      />

      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
    </Navigator>
  )
}
