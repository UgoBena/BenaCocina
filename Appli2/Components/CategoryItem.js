// Components/CategoryItem.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View , TouchableOpacity,Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


class CategoryItem extends React.Component {

  render() {
    return (
      <View style={styles.category}>
        <Dropdown
        containerStyle={styles.dropdown}
        data={this.props.categoriesData}
        dropdownOffset={{top:0,left:0}}
        onChangeText={(value,index,data) => {this.props.modifyCategoryValue(value,this.props.index)}}
        value={this.props.value}
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