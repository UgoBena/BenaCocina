// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View,ScrollView,Text , TouchableOpacity, Keyboard } from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Divider} from 'react-native-elements'

import {AddRecipeApi} from "../API/BenaCocinaBackApi";

import AddRecipeForm from "./AddRecipeForm";

class AddRecipe extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(recipe){
    AddRecipeApi(recipe);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={gStyles.main_container}>
        <AddRecipeForm submitRecipe={this.handleSubmit}/>
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