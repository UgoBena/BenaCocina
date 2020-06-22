// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View,Text } from 'react-native';


class AddRecipe extends React.Component {

  render() {
    return (
      <View style={gStyles.main_container}>
        <Text style={styles.text}>Add a new recipe here.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    padding:20,
    fontSize:18
  }
})



export default AddRecipe