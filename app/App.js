/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import CommonListItem from './temp/common_list_item';



const App = () => {

  let datas = []
  for (let index = 0; index < 10; index++) {
    datas.push({ title: `title--${index}`, value: `value--${index}` })
  }


  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <FlatList
        data={datas}
        renderItem={({ item, index }) => {
          console.log(item, index);
          return (
            <CommonListItem
              bgColor='red'
              tintColor="orange"
              onPress={() => { console.log("onpress"); }}
              title={item.title}
              value={item.value}
              style={{ justifyContent: 'center' }}
            >

            </CommonListItem>
          )
        }}
      >

      </FlatList>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: 'bold',
  },

});

export default App;
