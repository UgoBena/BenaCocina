// Components/AddRecipeForm.js

import React from 'react'

import gStyles from "../Styles";

import {StyleSheet,View, Text,TextInput, Button, Picker } from 'react-native';

class AddRecipeForm extends React.Component {

  constructor(props){
    super(props);
    this._times = ["5min","10min","15min","20min","30min","45min","1h","1h30","2h","3h+"];
    this.state={
      name:"",
      overview:"",
      cook_time:"",
      prep_time:"",
      nb_persons:0,
      dish_type:"",
      categories:[],
      ingredients:[],
      steps:[],
      comments:[]
    }
  }

  _loadTimePropositions(){
    return this._times.map(time => (
     <Picker.Item key={time} label={time} value={time} />
  ))
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>lorem ipsum et silaas</Text>
        <Picker
          selectedValue={this.state.cook_time}
          onValueChange={(itemValue, itemIndex) => 
          this.setState({cook_time: itemValue})}
          style={styles.picker}>
          {this._loadTimePropositions()}
        </Picker>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  picker:{
    width:150,
  },
  label:{
    marginTop:30,
    fontSize:20,
  }
})


export default AddRecipeForm;
