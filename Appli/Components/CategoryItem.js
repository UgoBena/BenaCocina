// Components/CategoryItem.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View , TouchableOpacity } from 'react-native';


class CategoryItem extends React.Component {

  render() {
    return (
      <View style={styles.category}>
        <Dropdown
        containerStyle={styles.dropdown}
        data={this.props.categoriesData}
        dropdownOffset={{top:0,left:0}}
        onChangeText={(value,index,data) => this.props.category = value;}
        />

        <TouchableOpacity onPress= {() => {
          this.props.removeCategory(this.props.index);}}>
           <Image
            source={require('../Images/ic_minus.png')}
            style={styles.icon}/>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  
  category:{
    flexDirection:"row",
    height:30,
    marginBottom:10
  },
  icon:{
    width:25,
    height:25,
  },
  dropdown:{
    width:120
  }
})

export default CategoryItem;