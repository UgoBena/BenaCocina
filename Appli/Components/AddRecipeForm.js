// Components/AddRecipeForm.js

import React from 'react'

import gStyles from "../Styles";

import {StyleSheet,View, Text,TextInput, TouchableOpacity, Button, Picker, Image } from 'react-native';

class AddRecipeForm extends React.Component {

  constructor(props){
    super(props);
    this._times = ["5min","10min","15min","20min","30min","45min","1h","1h30","2h","3h+"];
    this._dishTypes = ["starter","maindish","dessert"];
    this._nbPersons = [1,2,3,4,5,6,7,8];

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
      nbCategories:0,
      nbIngredients:0,
      nbSteps:0,
      nbComments:0
    }
  }

  _loadTimePropositions(){
    return this._times.map(time => (
     <Picker.Item key={time} label={time} value={time} />
  ))
  }

  _loadDishTypePropositions(){
    return this._dishTypes.map(dish => (
     <Picker.Item key={dish} label={this._dishLabel(dish)} value={dish} />
  ))
  }

  _loadNbPersonsPropositions(){
    return this._nbPersons.map(person => (
     <Picker.Item key={person} label={person} value={person} />
    ))
  }

  _dishLabel(dish){
    switch(dish){
      case "starter":
        return "Entrée"
      case "maindish":
        return "Plat"
      case "dessert":
        return "Dessert"
      default:
        return "all"
    }
  }

  _displayCategories(){
    const items = [];
    for (var i = 0; i < this.state.nbCategories; i++) {
        items.push(
          <View style={styles.category}>
            <Picker
            onValueChange={(itemValue, itemIndex) => 
            console.log(this.categories)}
            style={styles.picker}>
              <Picker.Item label={"Mediterranéen"} value={"mediterraneen"} />
              <Picker.Item label={"Asiatique"} value={"asiatique"} />
            </Picker>
            <TouchableOpacity style={styles.button} onPress= {() => {this.categories.pop();
                this.setState({nbCategories:this.state.nbCategories-1})}}>
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

  _displayIngredients(){
    const items = [];
    for (var i = 0; i < this.state.nbIngredients; i++) {
        items.push(
          <View style={styles.ingredient}>

            <TextInput  
            placeholder="Entrez la quantité"
            style={styles.name_textinput}
            keyboard="numeric"
            onChangeText={ (text) => this._nameTextInputChanged(text)}
            />

            <Picker
            onValueChange={(itemValue, itemIndex) => 
            this.ingredients[i] = itemValue}
            style={styles.picker}>
              <Picker.Item label={""} value={""} />
              <Picker.Item label={"g"} value={"g"} />
              <Picker.Item label={"kg"} value={"kg"} />
              <Picker.Item label={"L"} value={"L"} />
              <Picker.Item label={"mL"} value={"mL"} />
              <Picker.Item label={"Cuillère à café"} value={"cac"} />
              <Picker.Item label={"Cuillère à soupe"} value={"cas"} />
              <Picker.Item label={"Pincée"} value={"pincee"} />
              <Picker.Item label={"Poignée"} value={"poignee"} />
            </Picker>


            <TouchableOpacity style={styles.button} onPress= {() => {this.categories.pop();
                this.setState({nbCategories:this.state.nbCategories-1})}}>
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

  _nameTextInputChanged(text){
    this.name = text;
  }

  _dishTypeTextInputChanged(text){
    this.dish_type = text;
  }

  _overviewTextInputChanged(text){
    this.overview = text;
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
            onChangeText={ (text) => this._nameTextInputChanged(text)}
            />
          </View>
          {/*Dish Type Picker */}          
          <View style={styles.dishtype_input}>
            <Text style={styles.label}>Type de plat</Text>
            <Picker
              selectedValue={this.state.dish_type}
              onValueChange={(itemValue, itemIndex) => 
              this.setState({dish_type:itemValue})}
              style={styles.picker}
              itemStyle={{height:50}}>
              {this._loadDishTypePropositions()}
            </Picker>
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
            <TouchableOpacity style={styles.button} onPress= {() => {this.categories.push("");
            this.setState({nbCategories:this.state.nbCategories+1})}}>
             <Image
                source={require('../Images/ic_plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
          
          {/*NbPersons Picker */}          
          <View style={styles.dishtype_input}>
            <Text style={styles.label}>Nombre de personnes</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) => 
              this.nb_persons = itemValue}
              style={styles.picker}>
              {this._loadNbPersonsPropositions()}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Résumé :</Text>
        <TextInput  
            placeholder="Entrer un bref résumé de la recette (optionnel)"
            multiline={true}
            style={styles.overview_textinput}
            onChangeText={ (text) => this._overviewTextInputChanged(text)}
            />
        <View style={styles.row}>
          {/*Prep Time input*/}
          <View style={styles.time_input}>
            <Text style={styles.label}>Temps de préparation</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) => 
              this.prep_time = itemValue}
              style={styles.time_picker}>
              {this._loadTimePropositions()}
            </Picker>
          </View>
          {/*Cook Time Picker */}          
          <View style={styles.time_input}>
            <Text style={styles.label}>Temps de cuisson</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) => 
              this.cook_time = itemValue}
              style={styles.time_picker}>
              {this._loadTimePropositions()}
            </Picker>
          </View>
        </View>
        {/*Ingredients*/}
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
        
          
        {this._displaySteps()}
        {this._displayComments()}


        
      </View>

      <TouchableOpacity
          onPress={this.props.submitAction}
          style={styles.submit_button}>
          <Text style={styles.submit_text}>Ajouter la recette !</Text>
        </TouchableOpacity>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1
  },
  icon: {
    width: 15,
    height: 15
  },
  row:{
    flexDirection:"row",
    flex:1,
    marginBottom:10,
    minHeight:50,
  },
  picker:{
    width:130,
    marginBottom:5,
  },
  label:{
    fontSize:18,
    flexWrap: 'wrap'
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
    flex:1,
    width:180,
    marginRight:10,
    height:30
  },
  name_textinput:{

  },
  dishtype_input:{
    flex:1,
    height:30
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
  categories_container:{
    width:180
  },
  category:{
    flexDirection:"row"
  },



  submit_button:{
    alignItems:"center",
    marginTop:30
  },
  submit_text:{
    fontSize:20
  }
})


export default AddRecipeForm;
