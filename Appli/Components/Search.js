// Components/Search.js

import React from "react";
import { connect } from 'react-redux';

//global styles
import gStyles from "../Styles";
//Native components
import {ActivityIndicator,TouchableOpacity, Image,StyleSheet, View, TextInput, Button, FlatList, Text} from "react-native";
//Custom components
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";

//API
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

import recipes from "../Helpers/recipeData";


class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      recipes:[],
      isLoading:false,
      hideMovieList:false,
      category:this.props.navigation.state.params.category
    }
    this.searchedText = "";
  }

  componentDidMount(){
    this._searchRecipes(this.state.category);
  }

  _searchRecipes(category){
    this.setState({isLoading:true});
    this.setState({
      recipes:recipes.filter((item) => category.name=== "all" || item.type === category.name),
      isLoading:false
    })
  }


  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }


  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={gStyles.main_container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>{this.state.category.title}</Text>
        </View>
        <View style={styles.search_bar}>
          <TextInput 
          placeholder="Entrer le nom d'une recette à rechercher"
          style={styles.textinput}
          onChangeText={ (text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchRecipes()}
          />
          <TouchableOpacity style={styles.search_button} onPress={() => this._searchRecipes()}>
            <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        
        <RecipeList
        recipes = {this.state.recipes}
        navigation = {this.props.navigation}
        favoritesList={false}
        />

        {this._displayLoading()}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height:25,
    marginBottom:10,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_text:{
    fontWeight:"bold",
    fontSize:26
  },
  search_bar:{
    flexDirection:"row",
    backgroundColor: '#ffffff',
    borderRadius:20,
    marginLeft: 5,
    marginRight:5,
    marginBottom:10,

  },
  icon:{
    height:30,
    width:30,
  },
  textinput: {
    flex:10,
    height: 50,
    paddingLeft: 5
  },
  search_button:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(Search);