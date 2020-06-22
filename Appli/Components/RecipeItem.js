// Component/FilmItem.js

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
    const { film, displayDetailForFilm } = this.props;
    return(
      <TouchableOpacity style={styles.container}
      onPress={() => displayDetailForFilm(film.id)}>
        <Image style={styles.poster} source={{uri: getImageFromApi(film.poster_path)}} />
        <View style={styles.properties}>

          <View style={styles.properties_header}>
            {this._displayFavorite()}        
            <Text style = {styles.title_text}>{film.title}</Text>
            <Text style = {styles.rating_text}>{film.vote_average}</Text>
          </View>

          <View style={styles.properties_content}>          
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>

          <View style={styles.properties_footer}>          
            <Text style={styles.release_date}>Sorti le {film.release_date}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    height:190
  },

  poster:{
    width:120,
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
    flex:1,
    flexWrap:"wrap",
    fontSize: 20,
    fontWeight: "bold",
    color:"black"
  },
  rating_text:{
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  properties_content:{
    flex:7,
  },
  description_text:{
    fontStyle: 'italic',
    color: '#666666',
    fontSize: 14
  },
  properties_footer:{
    flexDirection:"row-reverse",
    flex:1,
  },
  release_date:{
    fontSize: 14
  },
  favorite_image:{
    width:40,
    height:40
  }
})

export default RecipeItem;