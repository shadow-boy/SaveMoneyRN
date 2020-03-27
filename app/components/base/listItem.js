
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default class ListItem extends Component {
    static defaultProps = {
        leftStyle: { flex: 1 },
        rightStyle: { flex: 1 }
    }


    

    render(){

        const { height = 64, LeftImageView, ImageType, leftStyle, left, rightStyle, right, iconView } = this.props;

        return (
            <View style={[styles.item, { height: height }]} >
                {(LeftImageView || ImageType) ? this._renderImage() : null}
                < View style={[styles.left, leftStyle]} >
                    {left}
                </View >
                <View style={[styles.right, rightStyle]}>
                    {right}
                </View>
                {iconView ? this._renderIcon() : null}
            </View >
        )
    }
}




const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    ImageItem: {
        width: 34,
        height: 34,
        borderRadius: 17,
        marginLeft: 15,
    },
    left: {
        justifyContent: 'flex-start',
        paddingLeft: 10,

    },
    right: {
        justifyContent: 'flex-end',
        paddingLeft: 12,
    }
});