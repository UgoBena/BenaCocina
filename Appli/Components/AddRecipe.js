// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View,ScrollView,Text , TouchableOpacity, Keyboard } from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
      <KeyboardAwareScrollView style={gStyles.main_container}>
        <AddRecipeForm submitAction={this._handleSubmit} recipe={this.recipe}/>
      </KeyboardAwareScrollView>
        
    )
  }
}

const styles = StyleSheet.create({
  container:{
    padding:10
  },
})



export default AddRecipe