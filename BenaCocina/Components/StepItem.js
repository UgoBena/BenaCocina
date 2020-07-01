// Components/StepItem.js

import React from 'react'

import gStyles from "../Styles";

import { StyleSheet,Text, View , TouchableOpacity,Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { Dropdown } from 'react-native-material-dropdown';


class StepItem extends React.Component {

  constructor(props){
    super(props);
    this.state={
      image:require('../Images/empty_image.png')
    }
  }

  _imageClicked() {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log("L\'utilisateur a annulé")
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri )
        let requireSource = { uri: response.uri }
        this.setState({
          image: requireSource
        });
        this.props.modifyStepImage(response.uri,this.props.index);
      }
    })
}

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

          <TouchableOpacity
          onPress={() => this._imageClicked()}
          >

           <Image
                source={this.state.image}
                style={styles.step_image}/>
            

          </TouchableOpacity>


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
  step_image:{
    width:40,
    height:40,
    resizeMode:"contain"
  }

})

export default StepItem;