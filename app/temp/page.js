import React, {
    Component,
    PureComponent,
    Fragment

} from 'react';
import {
    View, Text, Image, TextInput, TouchableHighlight,
    Button
} from 'react-native';

import styles from "../style/style_global"
import BasePageComponent from './BasePageComponent';


export default class NavigationLearnPage extends BasePageComponent {


    constructor(props) {
        super(props)
        this.renderNavigationBar("NavigationLearnPage")
    }
   
   backPage(){
    console.log("backPage --- page --overwrite");
    super.backPage()

   }
  
    renderContentView() {
        const { navigation } = this.props;
        console.log("renderContentView ----page--- overwrite")
        return (<View style={[styles.container, { justifyContent: 'center', flexDirection: "column" }]}>

            <Text
                style={{ textAlign: "center", backgroundColor: "grey", color: "white", height: 40 }}
                onPress={() => {
                    console.log(this.props.navigation)
                    this.props.navigation.push("pagenext");
                }}
            >navigatetion next</Text>
            <Button
                title="pop last"
                onPress={() => {
                    navigation.pop()
                }}
            >

            </Button>
            <Button
                title="pop to top"
                onPress={() => {
                    navigation.popToTop()
                }}
            >

            </Button>

            <Button
                title="go back"
                onPress={() => {
                    navigation.goBack()
                }}
            >

            </Button>
            <Button
                title="Update the title"
                onPress={() => this.renderNavigationBar("Updated!")}
            />




        </View>)


    }



}