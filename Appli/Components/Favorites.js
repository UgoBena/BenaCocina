// Components/Favorites.js

import React from 'react'
import { connect } from 'react-redux';

import gStyles from "../Styles";

import { StyleSheet, View } from 'react-native';

import RecipeList from "./RecipeList";

class Favorites extends React.Component {


  render() {
    console.log("favorites :");
    console.log(this.props.favorites);
    return (
      <View style={gStyles.main_container}>
        <RecipeList
        recipes = {this.props.favorites}
        navigation = {this.props.navigation}
        favoritesList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})


const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(Favorites);