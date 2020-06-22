// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import RecipeItem from './RecipeItem'
import { connect } from 'react-redux'


class RecipeList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          films: []
        }
        this._displayDetailForFilm = this._displayDetailForFilm.bind(this)
      }

      _displayDetailForFilm(idFilm){
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('RecipeDetail', {idFilm: idFilm})
      }

    render() {
        return (
            <FlatList
            style={styles.list}
            data={this.props.films}
            extraData={this.props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <RecipeItem 
                        film={item} 
                        isFavorite={this.props.favoritesFilm.findIndex((film)=> film.id === item.id) !==-1} 
                        displayDetailForFilm={this._displayDetailForFilm}/>
                        }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.props.page<this.props.totalPages && !this.props.favoritesList){ 
                this.props.loadFilms() 
              }
            }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flex:1
    }
})


const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(RecipeList);