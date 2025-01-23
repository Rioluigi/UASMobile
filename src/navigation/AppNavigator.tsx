import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import StartScreen from '../screens/StartScreen';
import Wings from '../screens/TabScreen/Home';
import OrderPage from '../screens/Detail/OrderPage';
import DetailPage from '../screens/Detail/DetailExample';
import EditOrderPage from '../screens/Detail/EditOrderPage';
import Home from '../screens/TabScreen/Home';
import Login from '../screens/authScreen/Login';
import RegisterScreen from '../screens/authScreen/Register';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="HomeTab" component={Wings} />
          <Stack.Screen
            name="DetailExample"
            component={DetailPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderPage"
            component={OrderPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="EditOrderPage" component={EditOrderPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
