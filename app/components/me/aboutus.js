import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TextInput, TouchableHighlight,
    Button
} from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import styles from "@style/style_global";



export default class AboutUsScreen extends Component {

    static navigationOptions = {
        title: "Abont Us"
    }
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <Button
                        title="go next"
                        onPress={() => {
                            const { navigation } = this.props
                            const { navigate } = navigation
                            navigate("pagenext")

                        }}
                    >

                    </Button>
                </View>
            </Fragment>
        )
    }
}