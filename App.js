import React from 'react';
// NAVEGAÇÃO
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// ROTAS
import {Home, Checkout, Tracking} from './src/routes'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}}/>
                <Stack.Screen name="Tracking" component={Tracking} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}