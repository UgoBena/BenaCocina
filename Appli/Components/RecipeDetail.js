// Components/RecipeDetail.js

import React from "react";
import {connect} from "react-redux";
//global styles
import gStyles from "../Styles";
//Native components
import {ActivityIndicator, StyleSheet, View, ScrollView, Image, Text, Button,TouchableOpacity} from "react-native";
//Custom components


//API
import { getFilmDetailFromApi,getImageFromApi } from "../API/TMDBApi";


class RecipeDetail extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      film: undefined,
      isLoading: false,
    }
  }

  componentDidMount(){
    //check if component is in favorites list
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    //if it is, simply grab its data from redux store
    if (favoriteFilmIndex!==-1){
      this.setState({film:this.props.favoritesFilm[favoriteFilmIndex]})
    }
    //else, make a request to the API
    else{
      this.setState({isLoading:true});
      getFilmDetailFromApi(this.props.navigation.getParam("idFilm")).then( (data) => {
      this.setState({
        film:data,
        isLoading:false,
      })
    })
    }
    
  }

  _toggleFavorite() {
    console.log("favorite toggle");
      const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
      this.props.dispatch(action);
  }

  _displayFilm() {
    var {film} = this.state;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          {/* Top Image*/}
          <View style={styles.poster_container}>
            <Image style={styles.poster} source={{uri: getImageFromApi(film.backdrop_path)}} />
          </View>

          {/* Film title*/}
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>          
          </View>

          {/* Film description*/}
          <View style={styles.description_container}>
            <Text style={styles.description_text}>{film.overview}</Text>
          </View>
          {/* Additional information*/}
          <View style={styles.info_container}>
            <Text style={styles.info_text}>Sorti le : {this._formatDate(film.release_date)}</Text>
            <Text style={styles.info_text}>Note : {film.vote_average} / 10</Text>
            <Text style={styles.info_text}>Nombre de votes : {film.vote_count}</Text>
            <Text style={styles.info_text}>Budget : {film.budget} $</Text>
            <Text style={styles.info_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}</Text>
            <Text style={styles.info_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}</Text>

          </View>
        </ScrollView>
      )
    }
  }

  _formatDate(date){
    var arr = date.split("-");
    return arr[2] + " / " + arr[1] + " / " + arr[0] 
  }

  _displayFavoriteImage(){
    var sourceImage = require("../Images/ic_not_favorite.png");
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      console.log("favoriteFound");
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
        {this._displayFilm()}
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
    flex:1
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
  },
  
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}


export default connect(mapStateToProps)(RecipeDetail);