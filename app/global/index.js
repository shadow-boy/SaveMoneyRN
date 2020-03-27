import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    YellowBox
} from 'react-native';

console.disableYellowBox = true;


const dimension = Dimensions.get('window');


global.dimension =  dimension;
global.width = dimension.width;
global.height = dimension.height;









