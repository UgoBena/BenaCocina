// Components/Favorites.js

import React from 'react'
import { connect } from 'react-redux';

import gStyles from "../Styles";

import { StyleSheet, View } from 'react-native';

import RecipeList from "./RecipeList";

class Favorites extends React.Component {


  render() {
    return (
      <View style={gStyles.main_container}>
        <RecipeList
        films = {this.props.favoritesFilm}
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
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites);