// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View,Text , TouchableOpacity,  } from 'react-native';
import {Divider} from 'react-native-elements'

import AddRecipeForm from "./AddRecipeFormTest";

class AddRecipe extends React.Component {

  constructor(props){
    super(props);
    this.recipe = {};
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(){
    console.log('value :', this.recipe);
  }

  render() {
    return (
      <View style={gStyles.main_container}>
        <AddRecipeForm submitAction={this._handleSubmit} recipe={this.recipe}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    padding:10
  },
})



export default AddRecipe