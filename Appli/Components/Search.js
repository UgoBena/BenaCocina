// Components/Search.js

import React from "react";
import { connect } from 'react-redux';

//global styles
import gStyles from "../Styles";
//Native components
import {ActivityIndicator, StyleSheet, View, TextInput, Button, FlatList, Text} from "react-native";
//Custom components
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";

//API
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";



class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      films:[],
      isLoading:false,
      hideMovieList:false,
      category:this.props.navigation.state.params.category
    }
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;

    this._loadFilms = this._loadFilms.bind(this)
  }

  _searchFilm(){
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {this._loadFilms()})
  }


  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }


  _loadFilms(){
    if (this.searchedText.length > 0) {
      this.setState({isLoading:true});

      getFilmsFromApiWithSearchedText(this.searchedText,this.page + 1).then( (data) => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading:false,
        })
      })
      .catch( (err) => console.log(err));
    }
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

  _displayHeader(){
    return(
      <View style={styles.header}>
          <Text style={styles.header_text}>{this.state.category}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={gStyles.main_container}>
        {this._displayHeader()}
        <TextInput 
        placeholder={"Rechercher dans " + this.state.category}
        style={styles.textinput}
        onChangeText={ (text) => this._searchTextInputChanged(text)}
        onSubmitEditing={() => this._searchFilm()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilm() }/>
        
        <RecipeList
        films = {this.state.films}
        navigation = {this.props.navigation}
        loadFilms = {this._loadFilms}
        page={this.page}
        totalPages={this.totalPages}
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom:10,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
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
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search);