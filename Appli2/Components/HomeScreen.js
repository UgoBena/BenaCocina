// Components/HomeScreen.js

import React from 'react'

import gStyles from "../Styles";

import { TouchableOpacity,StyleSheet, View, Image, FlatList, Text } from 'react-native';


class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      categories:[
        {
          title:"Toutes les recettes",
          name:"all",
          image:require('../Images/img_all.jpg'),
          isDishType:true,
        },
        {
          title:"Entrées/Tapas",
          name:"starter",
          image:require('../Images/img_starters.jpg'),
          isDishType:true,
        },
        {
          title:"Plats",
          name:"plat",
          image:require('../Images/img_maindish.jpg'),
          isDishType:true,
        },
        {
          title:"Desserts",
          name:"dessert",
          image:require('../Images/img_dessert.jpg'),
          isDishType:true,
        },
      ]
    }
  }


  _displayCategory(category){
    return(
      <TouchableOpacity style={styles.category} onPress={ () => this.props.navigation.
        navigate("Search",{isDishType:category.isDishType,category:category})}>
          <Image 
            style={styles.image} 
            source={category.image}
          />
          <Text style={styles.text}>{category.title}</Text>
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



export default HomeScreen