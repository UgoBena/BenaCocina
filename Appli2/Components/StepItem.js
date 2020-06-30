// Components/StepItem.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet,Text, View , TouchableOpacity,Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


class StepItem extends React.Component {

  render() {
    return (
      <View style={styles.step}>
        <Text style={styles.index}>{(this.props.index + 1) + "."}</Text>
        <TextInput  
            placeholder={"Rédigez les instructions pour l'étape " + (this.props.index + 1)}
            style={styles.textinput}
            multiline={true}
            defaultValue={this.props.value}
            onChangeText={ (text) => {this.props.modifyStepValue(text,this.props.index)}}
            />

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button} onPress= {() => {this.props.removeStep(this.props.index)}}>
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
  
  step:{
    flexDirection:"row",
    height:50,
    marginBottom:10
  },
  icon:{
    width:25,
    height:25,
  },
  button:{
  },
  index:{
    marginRight:10,
    fontSize:16
  },
  textinput:{
    maxWidth:160,
  },

})

export default StepItem;