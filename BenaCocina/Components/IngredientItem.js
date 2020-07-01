// Components/IngredientItem.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet, View , TouchableOpacity,Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


class IngredientItem extends React.Component {

  render() {
    return (
      <View style={styles.ingredient}>
        <TextInput  
            placeholder="Quantité"
            style={styles.quantity_textinput}
            keyboardType="numeric"
            blurOnSubmit={true}
            defaultValue={this.props.ingredient.quantity.toString()}
            onChangeText={ (text) => {this.props.modifyIngredientQuantity(text,this.props.index)}}
            />

            <Dropdown
            onChangeText={(value, index, data) => this.props.modifyIngredientUnit(value,this.props.index)}
            containerStyle={styles.dropdown}
            data={this.props.unitsData}
            dropdownOffset={{top:0,left:0}}
            value={this.props.ingredient.unit}
            />

            <TextInput  
            placeholder="Nom"
            style={styles.name_textinput}
            blurOnSubmit={true}
            defaultValue={this.props.ingredient.name}
            onChangeText={ (text) => {this.props.modifyIngredientName(text,this.props.index)}}
            />

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => {this.props.removeIngredient(this.props.index)}}>
               <Image
                source={require('../Images/ic_minus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  
  ingredient:{
    flexDirection:"row",
    height:50,
    marginBottom:10
  },
  icon:{
    width:25,
    height:25,
  },
  quantity_textinput:{
    width:40
  },
  dropdown:{
    width:50
  },
  name_textinput:{
    width:80
  },
})

export default IngredientItem;