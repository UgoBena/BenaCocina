// Components/AddRecipeForm.js

import React from 'react'

import gStyles from "../Styles";

import {Keyboard,StyleSheet,View, Text,TextInput, TouchableOpacity, Button, Image } from 'react-native';
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
    
    //Variable used as a key for every item, incremented once every time an item is added
    //to keep it unique per item
    this._keyCounter = 0;

    this.nbCategories = 0;
    this._ingredientsItem = [];
    this._stepsItem = [];
    this._commentsItem = [];

    this.state = {
      categoriesItem:[],
      nbIngredients:0,
      nbSteps:0,
      nbComments:0
    }
  }

  _displayIngredients(){
    const items = [];
    for (var i = 0; i < this.state.nbIngredients; i++) {
      let copy = i;
        items.push(
          <View key={copy} style={styles.ingredient}>

            <TextInput  
            placeholder="Quantité"
            style={styles.quantity_textinput}
            keyboardType="numeric"
            blurOnSubmit={true}
            onChangeText={ (text) => {this.ingredients[copy].quantity = parseFloat(text)}}
            />

            <Dropdown
            onChangeText={(value, index, data) => 
            {this.ingredients[copy].unit=value;console.log(this.ingredients[copy])}}
            containerStyle={styles.quantity_dropdown}
            data={this._unitsData}
            dropdownOffset={{top:15,left:0}}
            value={this.ingredients[copy].unit}
            />

            <TextInput  
            placeholder="Nom"
            style={styles.ingredient_textinput}
            blurOnSubmit={true}
            onChangeText={ (text) => {this.ingredients[copy].name = text}}
            />

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => {this._removeIngredient(copy)}}>
               <Image
                source={require('../Images/ic_minus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
          </View>
        )
      }

    return(
      <View style={styles.categories_container}>{this._ingredientsItem}</View>
    )

  }

  _addCategory(){
    let newCategories = [...this.state.categories,""]
    this._keyCounter++;

    this.setState({categories:newCategories});
    
  }

  _removeCategory(index){
    console.log(index);
    let newCategories = [...this.state.categoriesItem];

    newCategories.splice(index,1);

    this.setState({categoriesItem:newCategories});
    

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
            multiline={true}
            numberOfLines={2}
            style={styles.name_textinput}
            onChangeText={ (text) => {this.name = text}}
            blurOnSubmit={true}
            />
          </View>
          {/*Dish Type Picker */}
          <View style={styles.dishtype_input}>
            <Text style={styles.label}>Type de plat</Text>
            <Dropdown
            onChangeText={(value, index, data) => 
            {this.dish_type=value;console.log(this.dish_type)}}
            containerStyle={styles.dropdown}
            data={this._dishTypesData}
            dropdownOffset={{top:0,left:0}}
            labelFontSize={16}
            />
          </View>
          {/*Nb Persons Picker */}
          <View style={styles.nbPerson_input}>
            <Text style={styles.label}>Nb Pers.</Text>
            <Dropdown
            onChangeText={(value, index, data) => 
            {this.nb_persons=value;}}
            containerStyle={styles.nb_persons_dropdown}
            data={this._nbPersonsData}
            dropdownOffset={{top:0,left:0}}
            labelFontSize={16}
            />
          </View>
        </View>

        {/* CATEGORIES*/}
        <View style={styles.row}>
          <View style={styles.categories_labelview}>
            <Text style={styles.label}>Catégories :</Text>
          </View>
          <View style={styles.categories_input}>
            {this.state.categoriesItem}
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => this._addCategory()}>
             <Image
                source={require('../Images/ic_plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
            </View>
        </View>

        {/* OVERVIEW */}
        <Text style={styles.label}>Résumé :</Text>
        <TextInput  
            placeholder="Entrez un bref résumé de la recette (optionnel)"
            multiline={true}
            blurOnSubmit={true}
            style={styles.overview_textinput}
            onChangeText={ (text) => this.overview=text}
            />
        <View style={styles.row}>
          {/*Prep Time input*/}
          <View style={styles.time_input}>
            <Text style={styles.label}>Temps de préparation</Text>
            <Dropdown
            onChangeText={(value, index, data) => 
            {this.nb_persons=value;}}
            containerStyle={styles.dropdown}
            data={this._timesData}
            dropdownOffset={{top:0,left:0}}
            labelFontSize={16}
            />
          </View>
          {/*Cook Time Picker */}          
          <View style={styles.time_input}>
            <Text style={styles.label}>Temps de cuisson</Text>
            <Dropdown
            onChangeText={(value, index, data) => 
            {this.nb_persons=value;}}
            containerStyle={styles.dropdown}
            data={this._timesData}
            dropdownOffset={{top:0,left:0}}
            labelFontSize={16}
            />
          </View>
        </View>


        {/*INGREDIENTS*/}
        <View style={styles.row}>
           <View style={styles.categories_labelview}>
              <Text style={styles.label}>Ingredients :</Text>
            </View>
          <View style={styles.categories_input}>
           {this._displayIngredients()}
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => {this.ingredients.push({quantity:0,unit:"",name:""});
            this.setState({nbIngredients:this.state.nbIngredients+1})}}>
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
    padding:10,
    flex:1
  },
  icon: {
    width: 25,
    height: 25
  },
  row:{
    flexDirection:"row",
    marginBottom:30,
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
    width:25,
    height:25
  },
  name_input:{
    width:120,
    marginRight:10,
    height:50
  },
  dishtype_input:{
    marginRight:10
  },
  nbPerson_input:{
    alignItems:"flex-end"
  },
  nb_persons_dropdown:{
    width:50,
  },
  categories_container:{
    marginRight:20
  },
  categories_labelview:{
    justifyContent:"center",
    marginRight:15
  },
  categories_input:{
    marginRight:10
  },
  overview_textinput:{
    height:90,
    maxWidth:250
  },
  time_input:{
    flex:1,
    marginRight:10,
    width:100
  },
  time_picker:{
    width:100
  },
  ingredient:{
    flexDirection:"row"
  },
  quantity_textinput:{
    width:40
  },
  quantity_dropdown:{
    width:50
  },
  ingredient_textinput:{
    width:80
  }
})


export default AddRecipeForm;
