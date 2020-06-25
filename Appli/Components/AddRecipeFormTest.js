// Components/AddRecipeForm.js

import React from 'react'

import gStyles from "../Styles";

import {StyleSheet,View, Text,TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

class AddRecipeForm extends React.Component {

  constructor(props){
    super(props);
    this._timesData = [{value:"5min"},{value:"10min"},{value:"15min"},{value:"20min"},
    {value:"30min"},{value:"45min"},{value:"1h"},{value:"1h30"},{value:"2h"},{value:"3h+"}];
    this._dishTypesData = [{value:"starter",label:"Entrée"},{value:"maindish",label:"Plat"},
    {value:"dessert",label:"Dessert"}];
    this._nbPersonsData = [{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8}];
    this._categoriesData = [{value:"Mediterranéen"},{value:"Asiatique"}]
    this._unitsData = [{value:""},{value:"g"},{value:"kg"},{value:"mL"},{value:"L"},{value:"cuillère(s) à café"},
    {value:"cuillère(s) à soupe"},{value:"pincée(s)"},{value:"poignée(s)"}];



    this.name="";
    this.overview="";
    this.cook_time="";
    this.prep_time="";
    this.nb_persons=0;
    this.dish_type="";
    this.categories=[];
    this.ingredients=[];
    this.steps=[];
    this.comments=[];
    


    this.state = {
      dish_type:"",
      categories:[],
      nbCategories:0,
      nbIngredients:0,
      nbSteps:0,
      nbComments:0
    }
  }

  _displayCategories(){
    const items = [];
    for (var i = 0; i < this.state.nbCategories; i++) {
      var copy = i;
        items.push(
          <View key={copy} style={styles.category}>
            <Dropdown
            onChangeText={(value, index, data) => 
            {this.categories[copy]=value;console.log(this.categories)}}
            containerStyle={styles.dropdown}
            data={this._categoriesData}
            dropdownOffset={{top:15,left:0}}
            labelFontSize={16}
            />

            <TouchableOpacity style={styles.button} onPress= {() => {this.categories.splice(copy,1);
                this.setState({nbCategories:this.state.nbCategories-1})}}>
               <Image
                source={require('../Images/ic_minus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
        )
      }

    if (this.state.nbCategories === 0){
      items.push(          <View key={copy} style={styles.category}/>
        )
    }

    return(
      <View style={styles.categories_container}>{items}</View>
    )
  }

  _displayIngredients(){
    const items = [];
    for (var i = 0; i < this.state.nbIngredients; i++) {
      var copy = i;
        items.push(
          <View style={styles.ingredient}>

            <TextInput  
            placeholder="Entrez la quantité"
            style={styles.quantity_textinput}
            keyboard="numeric"
            onChangeText={ (text) => {this.ingredients[copy].quantity = parseFloat(text)}}
            />

            <Dropdown
            onChangeText={(value, index, data) => 
            {this.ingredients[copy].unit=value;console.log(this.ingredients)}}
            containerStyle={styles.dropdown}
            data={this._unitsData}
            dropdownOffset={{top:15,left:0}}
            labelFontSize={16}
            />


            <TouchableOpacity style={styles.button} onPress= {() => {this.ingredients.splice(copy,1);
                this.setState({nbIngredients:this.state.nbIngredients-1})}}>
               <Image
                source={require('../Images/ic_minus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
        )
      }

    return(
      <View style={styles.categories_container}>{items}</View>
    )

  }

  _displaySteps(){

  }

  _displayComments(){

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.row}>
          {/*Recipe name input*/}
          <View style={styles.name_input}>
            <Text style={styles.label}>Nom</Text>
            <TextInput  
            placeholder="Entrer le nom de la recette"
            style={styles.name_textinput}
            onChangeText={ (text) => {this.name = text}}
            />
          </View>
          {/*Dish Type Picker */}
          <View style={styles.dishtype_input}>
            <Dropdown
            label="Type de plat"
            onChangeText={(value, index, data) => 
            {this.dish_type=value;console.log(this.dish_type)}}
            containerStyle={styles.dropdown}
            data={this._dishTypesData}
            dropdownOffset={{top:15,left:0}}
            labelFontSize={16}
            />
          </View>
        </View>

        <View style={styles.row}>
          {/*Categories input*/}
          <View style={styles.categories_labelview}>
            <Text style={styles.label}>Catégories :</Text>
          </View>
          <View style={styles.categories_input}>
            {this._displayCategories()}
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => {
            this.setState({nbCategories:this.state.nbCategories+1})}}>
             <Image
                source={require('../Images/ic_plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
            </View>
        </View>
        
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    padding:10
  },
  icon: {
    width: 25,
    height: 25
  },
  row:{
    flexDirection:"row",
    flex:1,
    marginBottom:20,
    backgroundColor:"red",
  },
  dropdown:{
    width:130,
    marginBottom:5,
  },
  label:{
    fontSize:18,
    fontWeight:"bold",
  },
  button_container:{
    justifyContent:"center",
    alignItems:"center",
    marginRight:10,
  },
  button:{ 
    width:15,
    height:15
  },
  name_input:{
    width:180,
    marginRight:10,
    height:30
  },
  name_textinput:{

  },
  dishtype_input:{
  },

  categories_container:{
    flex:1
  },
  category:{
    flexDirection:"row",
    height:30,
    minWidth:130,
    flex:1,
  },
  categories_labelview:{
    justifyContent:"center",
    alignItems:"center",
    marginRight:15
  },
  categories_input:{
    marginRight:10
  },
  overview_textinput:{
    height:50
  },
  time_input:{
    flex:1,
    marginRight:10,
    width:100
  },
  time_picker:{
    width:100
  },
})


export default AddRecipeForm;
