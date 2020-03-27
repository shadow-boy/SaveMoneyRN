import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Platform,
  Image,
  TextInput, TouchableHighlight
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import styles from "@style/style_global";
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from "react-native-image-picker";



export default class MeScreen extends Component {

  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    console.log("componentDidMount")

  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'junmy',
      description: "Convenient financial gadget",
      avatarSource: null
    };

    AsyncStorage.getItem("userTitle").then(value => {
      if (value.length){
        this.setState({
          value: value
        })
      }
    
    }).catch(e => console.log(e))

    AsyncStorage.getItem("userDescription").then(value => {
    if (value.length){
      this.setState({
        description: value
      })
    }
    }).catch(e => console.log(e))


    AsyncStorage.getItem("userAvatarURL").then(value => {
      this.setState({
        avatarSource: { uri: value }
      })
    }).catch(e => console.log(e))





  }

  openImagePicker() {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });

        this.saveToLocal()
      }
    });

  }

  saveToLocal() {

    console.log(this.state.value, this.state.description);
    AsyncStorage.setItem("userTitle", this.state.value).then(() => {
      console.log('保存success----')
    })


    AsyncStorage.setItem("userDescription", this.state.description).then(() => {
      console.log('保存success----');
    })

    if (this.state.avatarSource.uri){
      console.log(this.state.avatarSource.uri,"this.state.avatarSource.uri")
      AsyncStorage.setItem("userAvatarURL", this.state.avatarSource.uri).then(() => {
        console.log('保存success----');
      })
    }
    else{
      console.log(this.state.avatarSource == null,this.state.avatarSource,this.state.avatarSource.uri)

    }
   



  }

  render() {

    return (

      <Fragment>
        <View style={styles.container}>

          <View style={model.top_info}>

            <View style={model.topPostion}>

              <TouchableHighlight
                underlayColor="#fff"


                onPress={() => {
                  console.log("avatar press")
                  //open imagepicker 
                  this.openImagePicker()


                }}>
                <Image source={this.state.avatarSource} style={model.avatar}></Image>

              </TouchableHighlight>
              <View style={model.rightColumn}>
                <TextInput style={{ fontSize: 18, fontWeight: "800", color: "#fff" }}
                  onChangeText={(value) => {
                    this.setState({
                      value: value
                    })
                    this.saveToLocal()

                  }}
                  value={this.state.value}
                ></TextInput>
                <TextInput style={{ fontSize: 18, fontWeight: "400", marginTop: 10, color: "#fff" }}
                  onChangeText={(value) => {
                    this.setState({
                      description: value
                    });

                    this.saveToLocal()
                  }}
                  value={this.state.description}

                ></TextInput>
              </View>
            </View>
          </View>

          <ScrollView style={{ backgroundColor: "white" }}>
            <TouchableHighlight
              underlayColor="#fff"
              onPress={()=>{
                console.log("mybook")
                this.props.navigation.navigate("mybook", { "pushkey": "push_parameter_value" })
              }}
            >
              <Text style={model.listItem}>My books</Text>
            </TouchableHighlight>


            <TouchableHighlight
              underlayColor="#fff"
              onPress={()=>{
              this.props.navigation.navigate("about", { "pushkey": "push_parameter_value" })
            }}
            >
              <Text style={model.listItem}>About us</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#fff"
              onPress={() => {
                this.props.navigation.navigate("feedback", { "pushkey": "push_parameter_value" })
              }}
            >
              <Text style={model.listItem}>Feedback</Text>

            </TouchableHighlight>

          </ScrollView>
        </View>

      </Fragment>
    )
  }
}




const model = StyleSheet.create({
  top_info: {
    height: 200,
    backgroundColor: "#F3AC87",
  },
  topPostion: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    height: 60,

  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",

  },
  rightColumn: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    marginLeft: 20,
  },
  listItem: {
    height: 60,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 14,
    color: "#333333",
    paddingLeft: 15,
    ...Platform.select({
      ios: {
        lineHeight: 60,
      }
    })

  }




});