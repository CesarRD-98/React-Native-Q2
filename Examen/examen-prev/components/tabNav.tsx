import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Inicio from '../screens/inicio';
import RealizarPedido from '../screens/realizarPedido';
import Eliminados from '../screens/eliminados';

export default function TabNav() {

    const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name='Inicio' component={Inicio}></Tab.Screen>
            <Tab.Screen name='Realizar pedido' component={RealizarPedido}></Tab.Screen>
            <Tab.Screen name='Eliminados' component={Eliminados}></Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
  )
}
