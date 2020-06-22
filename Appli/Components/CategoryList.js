// Components/AddRecipe.js

import React from 'react'

import gStyles from "../Styles";

import { TouchableOpacity,StyleSheet, View, Image, FlatList, Text } from 'react-native';


class CategoryList extends React.Component {

  constructor(props){
    super(props);
    this.state={
      categories:[
        {
          name:"Toutes les recettes",
          image:require('../Images/img_all.jpg')
        },
        {
          name:"Entrées/Tapas",
          image:require('../Images/img_starters.jpg')
        },
        {
          name:"Plats",
          image:require('../Images/img_maindish.jpg')
        },
        {
          name:"Desserts",
          image:require('../Images/img_dessert.jpg')
        },
      ]
    }
  }

  _displayCategory(category){
    console.log(category);
    return(
      <TouchableOpacity style={styles.category} onPress={ () => this.props.navigation.navigate("Search",{category:category.name})}>
          <Image 
            style={styles.image} 
            source={category.image}
          />
          <Text style={styles.text}>{category.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={gStyles.main_container}>
        <FlatList
          data={this.state.categories}
          keyExtractor={ (item) => item.name }
          renderItem={ ({item}) => this._displayCategory(item) }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  category:{
    height:150,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  image:{
    flex:1,
    height:150
  },
  text:{
    position:"absolute",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight:"bold",
    fontSize: 32,
    color: '#ffffff',
  },

})



export default CategoryList