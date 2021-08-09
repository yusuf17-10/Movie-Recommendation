import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/Home'
import {createAppContainer} from "react-navigation"
import {createBottomTabNavigator} from "react-navigation-tabs"
import RecommendedMovie from "./Screens/recommendation"
import PopularMovie from "./Screens/popular"
export default function App() {
  return (
    
    <AppContainer/>
  );
}



var AppTabnavigator = createBottomTabNavigator({
  home : {screen:HomeScreen},
  recommended_movies : {screen:RecommendedMovie},
  popular_movies : {screen:PopularMovie}

})


const AppContainer = createAppContainer(AppTabnavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
