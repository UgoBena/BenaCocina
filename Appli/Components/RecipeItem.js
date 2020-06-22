// Component/RecipeItem.js

import React from "react";
//Native components
import {TouchableOpacity, StyleSheet, View, Image,Text} from "react-native";
import { getImageFromApi } from '../API/TMDBApi';

//global styles
import gStyles from "../Styles";

class RecipeItem extends React.Component{
  _displayFavorite(){
    if(this.props.isFavorite){
      return(
          <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }
  render(){
    const { recipe, displayDetailForRecipe } = this.props;
    return(
      <TouchableOpacity style={styles.container}
      onPress={() => displayDetailForRecipe(recipe.id)}>
        <Image style={styles.poster} source={recipe.image_path} />
        <View style={styles.properties}>

          <View style={styles.properties_header}>
            {this._displayFavorite()}        
            <Text style = {styles.title_text}>{recipe.name}</Text>
          </View>

          <View style={styles.properties_content}>          
            <Text style={styles.description_text} numberOfLines={3}>{recipe.overview}</Text>
          </View>

          <View style={styles.properties_footer}>          
            <Text style={styles.release_date}>Temps de préparation : {recipe.prep_time}</Text>
            <Text style={styles.release_date}>Temps de cuisson : {recipe.cook_time}</Text>

          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    height:130
  },

  poster:{
    width:120,
    height:130,
    margin:5,
  },
  properties:{
    flex:1,
    margin:5,
  },

  properties_header:{
    flex:3,
    flexDirection:"row",
  },
  title_text:{
    flex:4,
    flexWrap:"wrap",
    fontSize: 18,
    fontWeight: "bold",
    color:"black"
  },
  properties_content:{
    flex:4,
  },
  description_text:{
    fontStyle: 'italic',
    color: '#666666',
    fontSize: 14
  },
  properties_footer:{
    flex:1,
    marginBottom:10
  },
  release_date:{
    fontSize: 14
  },
  favorite_image:{
    width:30,
    height:30
  }
})

export default RecipeItem;