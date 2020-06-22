// Navigation/Navigation.js
import React from 'react';

import {StyleSheet, Image } from "react-native";
import {createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from "react-navigation-tabs";

//Custom Components
import CategoryList from "../Components/CategoryList"
import Search from '../Components/Search';
import RecipeDetail from '../Components/RecipeDetail';
import Favorites from '../Components/Favorites';
import AddRecipe from '../Components/AddRecipe';

const SearchStackNavigator = createStackNavigator({
  Categories:{
    screen:CategoryList,
    navigationOptions: {
      title: 'Categories'
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title:''
    }
  },
  RecipeDetail: {
    screen: RecipeDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorite: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  RecipeDetail: {
    screen: RecipeDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const RecipesTabNavigator = createBottomTabNavigator(
  {
    Search:{
      screen:SearchStackNavigator,
      navigationOptions: {
          tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
            return <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
          }
        }
    },
    Favorites:{
      screen:FavoritesStackNavigator,
      navigationOptions: {
          tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
            return <Image
              source={require('../Images/ic_not_favorite.png')}
              style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
          }
        }
    },
    Add:{
      screen:AddRecipe,
      navigationOptions: {
          tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
            return <Image
              source={require('../Images/ic_plus.png')}
              style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
          }
        }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(RecipesTabNavigator);