// Components/RecipeDetail.js

import React from "react";
import {connect} from "react-redux";
//global styles
import gStyles from "../Styles";
//Native components
import {ActivityIndicator, StyleSheet, View, ScrollView, Image, Text, Button,TouchableOpacity} from "react-native";
//Custom components

//API
import { getRecipeDetailFromApi } from "../API/BenaCocinaBackApi";


class RecipeDetail extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      recipe: undefined,
      isLoading: false,
    }
  }

  componentDidMount(){
    //check if component is in favorites list
    const favoriteIndex = this.props.favorites.findIndex(item => item.id === this.props.navigation.state.params.recipeName)
    //if it is, simply grab its data from redux store
    if (favoriteIndex!==-1){
      this.setState({recipe:this.props.favorites[favoriteIndex]})
    }
    //else, make a request to the API
    else{
      this.setState({isLoading:true});
      getRecipeDetailFromApi(this.props.navigation.state.params.recipeName).then(res => {
              this.setState({recipe:res,isLoading:false})
      }).catch(err => console.log(err));
    }
    
  }

  _toggleFavorite() {
      const action = { type: "TOGGLE_FAVORITE", value: this.state.recipe };
      this.props.dispatch(action);
  }

  _displayRecipe() {
    var {recipe} = this.state;
    if (recipe != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          {/* Top Image*/}
          <View style={styles.poster_container}>
            <Image style={styles.poster} source={recipe.image_path} />
          </View>

          {/* Film title*/}
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{recipe.name}</Text>
            <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>          
          </View>

          {/* Recipe description*/}
          <View style={styles.description_container}>
            <Text style={styles.description_text}>{recipe.overview}</Text>
          </View>
          {/* Additional information*/}
          <View style={styles.info_container}>
            <Text style={styles.info_text}>Temps de préparation : {recipe.prep_time}</Text>
            <Text style={styles.info_text}>Temps de cuisson : {recipe.cook_time}</Text>
          </View>
          <View style={styles.ingredients_container}>
            <Text style={styles.title_text}>Ingrédients</Text>
          </View>
          <View style={styles.steps_container}>
            <Text style={styles.title_text}>Etapes</Text>
          </View>
        </ScrollView>
      )
    }
  }

  _displayFavoriteImage(){
    var sourceImage = require("../Images/ic_not_favorite.png");
    if (this.props.favorites.findIndex(item => item.id === this.state.recipe.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png');
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
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
        {this._displayLoading()}
        {this._displayRecipe()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container:{
    flex:1,
    margin:5
  },
  poster_container:{
    flexDirection:"row",
    height:180
  },
  poster:{
    flex:1,
    height:180
  },
  title_container:{
    alignItems:"center",
    padding:5
  },
  title_text:{
    flexWrap:"wrap",
    fontSize: 26,
    fontWeight: "bold",
    color:"black"
  },
  favorite_container:{
    alignItems:"center"
  },
  favorite_image:{
    width:40,
    height:40
  },
  description_container:{
    marginBottom:15
  },
  description_text:{
    fontStyle:"italic",
    color:"gray",
  },
  info_container:{
    marginBottom:20
  },
  ingredients_container:{
    marginBottom:20
  },
  
})

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}


export default connect(mapStateToProps)(RecipeDetail);