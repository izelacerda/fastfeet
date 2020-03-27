import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Orders from '~/pages/Orders';
import Detail from '~/pages/Orders/Order/Detail';
import Finish from '~/pages/Orders/Order/Finish';
import Problems from '~/pages/Problems';
import AddProblem from '~/pages/Problems/AddProblem';

Icon.loadFont();

const Stack = createStackNavigator();

export default function Order({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false, borderBottomWidth: 0 }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes da encomenda',
          headerStyle: {
            backgroundColor: '#7d3fe7',
            elevation: 0,
            shadowColor: 'transparent',
            height: 95,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddProblem"
        component={AddProblem}
        options={{
          title: 'Informar problema',
          headerStyle: {
            backgroundColor: '#7d3fe7',
            elevation: 0,
            shadowColor: 'transparent',
            height: 95,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{
          title: 'Visualizar problemas',
          headerStyle: {
            backgroundColor: '#7d3fe7',
            elevation: 0,
            shadowColor: 'transparent',
            height: 95,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Finish"
        component={Finish}
        options={{
          title: 'Confirmar entrega',
          headerStyle: {
            backgroundColor: '#7d3fe7',
            elevation: 0,
            shadowColor: 'transparent',
            height: 95,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
