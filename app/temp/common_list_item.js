
import React, { PureComponent } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    Button,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';

export default class CommonListItem extends PureComponent {

    static defaultProps = {
        bgColor: "white",
        tintColor: "red",
        onPress: () => { },
        height: 64,
        title: "title",
        value: "value",
        style: {

        }

    }

    static propTypes = {
        bgColor: PropTypes.string,
        tintColor: PropTypes.string,
        height: PropTypes.number,
        onPress: PropTypes.func,
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        style: PropTypes.object

    }

    render() {
        const { bgColor, height, tintColor, onPress, title, value, style } = this.props
        let styles_props = { flex: 1, flexDirection: "row", alignItems: "center", height: height, ...style }

        let cell = <TouchableHighlight
        underlayColor="#eee"
            onPress={onPress}>
            <View style={styles_props}>
                <Text>{title}</Text>
                <Text>{value}</Text>

            </View>
        </TouchableHighlight>
        return cell;

    }


}