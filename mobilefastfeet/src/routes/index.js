import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import dashboardRoutes from '~/routes/Dashboard';
import Signin from '~/pages/SignIn';

const Stack = createStackNavigator();

export default function Routes(isSigned = false) {
  return (
    <Stack.Navigator>
      {!isSigned ? (
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Dashboard"
          component={dashboardRoutes}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
