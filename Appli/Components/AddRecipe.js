// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View,Text , TouchableOpacity,  } from 'react-native';
import {Divider} from 'react-native-elements'

import AddRecipeForm from "./AddRecipeForm";

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
      <View style={styles.container}>
        <Text style={styles.header}>Ajouter une recette</Text>
        <Divider/>
        <View style={styles.form}>
          <AddRecipeForm recipe={this.recipe}/>
        </View>

        <TouchableOpacity
          onPress={this._handleSubmit}
          style={styles.submit_button}>
          <Text>Créer la recette !</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:5
  },
  header:{
    fontSize:26,
    marginTop:20,
    marginBottom:20
  },
  form:{
  },
  submit_button:{

  }
})



export default AddRecipe