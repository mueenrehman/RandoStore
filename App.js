import React, { Component } from "react";
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator , TransitionPresets } from 'react-navigation-stack';

import HomeScreen from './src/screens/Home'
import AddItemsScreen from './src/screens/AddItems'
import ItemsScreen from './src/screens/Items'
import CheckOutScreen from './src/screens/CheckOut'


const AppNavigator = createStackNavigator(
  {
    
    Home: { screen: HomeScreen},
    AddItems: { screen: AddItemsScreen},
    Items: { screen: ItemsScreen},
    CheckOut: { screen: CheckOutScreen}

  },
  

  {
    initialRouteName: 'Home',

  }
);


const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
render() {
    return <AppContainer />;
  }
};