// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import RecipeItem from './RecipeItem'
import { connect } from 'react-redux'


class RecipeList extends React.Component{

    constructor(props) {
        super(props)
        
        this._displayDetailForRecipe= this._displayDetailForRecipe.bind(this)
      }

      _displayDetailForRecipe(name){
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('RecipeDetail', {recipeName: name})
      }

    render() {
        return (
            <FlatList
            style={styles.list}
            data={this.props.recipes}
            extraData={this.props.favorites}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => <RecipeItem 
                        recipe={item} 
                        isFavorite={this.props.favorites.findIndex((recipe)=> recipe.name === item.name) !==-1} 
                        displayDetailForRecipe={this._displayDetailForRecipe}/>
                        }
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
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(RecipeList);