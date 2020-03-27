import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput, TouchableHighlight
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import styles from "@style/style_global";



export default class FeedBackScreen extends Component {

  static navigationOptions = {
    title:"FeedBack",
    headerRight:<Text style={{marginRight:20,color:"white",fontWeight:"600"}} onPress={()=>{console.log("submit action --- ")}}>Submit</Text>
  }

  
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {

console.log(this.props.navigation);

    return (
      <Fragment>
        <View style={styles.container}>
          <TextInput style={model.input}
            multiline={true}
            placeholder="Please enter your comments and suggestions, and the staff will evaluate the processing as soon as possible. Thank you for your kind feedback!"
            value={this.state.value}
            onChangeText={value => this.setState({ value: value })}
          ></TextInput>
        </View>
      </Fragment>
    );
  }
}

const model = StyleSheet.create({
  input: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    height: 300,
  }
})