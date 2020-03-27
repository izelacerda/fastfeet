import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Order from '~/routes/Order';
import Profile from '~/routes/Profile';

Icon.loadFont();

const Tabs = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7d3fe7',
        inactiveTintColor: 'rgba(0, 0, 0, 0.6)',
        style: {
          backgroundColor: '#fff',
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={25} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
