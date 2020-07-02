// Components/AddRecipeForm.js

import React from 'react'

import gStyles from "../Styles";

import {Keyboard,StyleSheet,View, Text,TextInput, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker'

import CategoryItem from './CategoryItem';
import IngredientItem from './IngredientItem';
import StepItem from './StepItem';


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
    
    this.categories = [];
    this.ingredients = [];
    this.steps = [];
    this.comments = [];

    this.state = {
      categoriesItem:[],
      ingredientsItem:[],
      stepsItem:[],
      commentsItem:[],
      image:require('../Images/empty_image.png')
    }
  }

  _resetForm(){
    this.name="";
    this.overview="";
    this.cook_time="";
    this.prep_time="";
    this.nb_persons=0;
    this.dish_type="";

    this.categories = [];
    this.ingredients = [];
    this.steps = [];
    this.comments = [];

    this.setState({
      categoriesItem:[],
      ingredientsItem:[],
      stepsItem:[],
      commentsItem:[],
      image:require('../Images/empty_image.png')
    })
  }

  _makeCategoriesItem(categories){
    let categoriesItem = [];
    for (var i = 0; i<categories.length;i++){
      categoriesItem.push(
        <CategoryItem
        key={i}
        categoriesData={this._categoriesData}
        index={i}
        value={categories[i]}
        modifyCategoryValue={this.modifyCategoryValue}
        removeCategory={this.removeCategory}
        />
        )
    }
    return categoriesItem
  }

  _addCategory(){
    this.categories.push("");
    this.setState({categoriesItem:this._makeCategoriesItem(this.categories)})    
  }

  removeCategory = (index) => {
    this.categories.splice(index,1);
    this.setState({categoriesItem:this._makeCategoriesItem(this.categories)})      

  }
  modifyCategoryValue = (value,index) => {
    this.categories[index] = value;
  }

   _makeIngredientsItem(ingredients){
    let ingredientsItem = [];
    for (var i = 0; i<ingredients.length;i++){
      ingredientsItem.push(
        <IngredientItem
        key={i}
        index={i}
        unitsData={this._unitsData}
        ingredient={ingredients[i]}
        modifyIngredientQuantity={this.modifyIngredientQuantity}
        modifyIngredientUnit={this.modifyIngredientUnit}
        modifyIngredientName={this.modifyIngredientName}
        removeIngredient={this.removeIngredient}
        />
        )
    }
    return ingredientsItem
  }

  _addIngredient(){
    this.ingredients.push({quantity:0,unit:"",name:""});
    this.setState({ingredientsItem:this._makeIngredientsItem(this.ingredients)});    
  }


  removeIngredient = (index) => {
    this.ingredients.splice(index,1);
    this.setState({ingredientsItem:this._makeIngredientsItem(this.ingredients)});     

  }
  modifyIngredientQuantity = (value,index) => {
    this.ingredients[index].quantity = parseFloat(value);
  }
  modifyIngredientUnit = (value,index) => {
    this.ingredients[index].unit = value;
  }
  modifyIngredientName = (value,index) => {
    this.ingredients[index].name = value;
  }

  _makeStepsItem(steps){
    let stepsItem = [];
    for (var i = 0; i<steps.length;i++){
      stepsItem.push(
        <StepItem
        key={i}
        index={i}
        value={steps[i].description}
        modifyStepValue={this.modifyStepValue}
        modifyStepImage={this.modifyStepImage}
        removeStep={this.removeStep}
        />
        )
    }
    return stepsItem
  }

  _addStep(){
    this.steps.push({description:"",image:""})
    this.setState({stepsItem:this._makeStepsItem(this.steps)})    
  }

  removeStep = (index) => {
    this.steps.splice(index,1);
    this.setState({stepsItem:this._makeStepsItem(this.steps)});
  }
  modifyStepValue = (value,index) => {
    this.steps[index].description = value;
  }
  modifyStepImage = (image,index) => {
    this.steps[index].image = image;
  }



  _makeRecipe(){
    const recipe = {
      imageUri:this.state.image.uri,
      name:this.name,
      overview:this.overview,
      prep_time:this.prep_time,
      cook_time:this.cook_time,
      nb_persons:this.nb_persons,
      dish_type:this.dish_type,
      categories:this.categories,
      ingredients:this.ingredients,
      steps:this.steps,
      comments:this.comments
    };

    this.props.submitRecipe(recipe).then( (data) => {
      this._resetForm();
    })
    .catch((err) => console.log(err));
  }

  _mainImagePicker(){
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log("L\'utilisateur a annulé")
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri )
        let requireSource = { uri: response.uri }
        this.setState({
          image: requireSource
        })
      }
    })
  }

  render(){
    return(
      <View style={styles.container}>
       <TouchableOpacity
        onPress={() => this._mainImagePicker()}
        style={styles.main_image_container}
        >
         <Image
            source={this.state.image}
            style={styles.main_image}
          />
        </TouchableOpacity>
        <View style={styles.row}>
          
          {/*Recipe name input*/}
          <View style={styles.name_input}>
            <Text style={styles.label}>Nom</Text>
            <TextInput  
            placeholder="Entrez le nom de la recette"
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
            {this.dish_type=value;}}
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
           {this.state.ingredientsItem}
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => this._addIngredient()}>
             <Image
                source={require('../Images/ic_plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View> 
        </View>
        
        {/*STEPS*/}
        <View style={styles.row}>
           <View style={styles.categories_labelview}>
              <Text style={styles.label}>Etapes :</Text>
            </View>
          <View style={styles.categories_input}>
           {this.state.stepsItem}
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => this._addStep()}>
             <Image
                source={require('../Images/ic_plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View> 
        </View>

      {/*SUBMIT BUTTON*/}
        <View style={styles.submit_button_container}>
        <TouchableOpacity onPress={() => this._makeRecipe()}>
          <Text style={styles.submit_button}>
          Ajouter la recette !
          </Text>
        </TouchableOpacity>
          
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
  main_image_container:{
    flex:1,
    height:150
  },
  main_image:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
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
  submit_button:{
    borderWidth:1,
    color:"#ffffff",
    backgroundColor:"#000000",
    padding:10,
    borderRadius:25
  },
  submit_button_container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})


export default AddRecipeForm;
