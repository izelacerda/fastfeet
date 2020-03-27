import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfilePage from '~/pages/Profile';
import Image from '~/pages/Profile/Image';

Icon.loadFont();

const Stack = createStackNavigator();

export default function Profile({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false, borderBottomWidth: 0 }}
      />
      <Stack.Screen
        name="Image"
        component={Image}
        options={{
          title: 'Foto Perfil',
          headerStyle: {
            backgroundColor: '#7d40e7',
            shadowColor: 'transparent',
            height: 95,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
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
