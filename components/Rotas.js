import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import Home from './Home';
import Cadastro from './Cadastro';
import Alterar from './Alterar';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Estoques' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastrar Estoque' }} />
        <Stack.Screen name="Alterar" component={Alterar} options={{ title: 'Alterar Estoque' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
