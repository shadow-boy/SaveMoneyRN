import React, {
  Component
} from 'react';
import {
  Image
} from 'react-native';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";


import main_screen from '../components/main/main';
import me_screen from '../components/me/me';
import FeedBackScreen from '../components/me/feedback';
import AboutUsScreen from '../components/me/aboutus';
import MyBookScreen from '../components/me/mybook';
import AddNewOjectScreen from '../components/add/add_new_object';
import NavigationLearnPage from '../temp/page';


const default_navigationOptions = {
  headerTintColor: "white",
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: "#F3AC87"
  }
};


const navi_stack_main = createStackNavigator({
  main: main_screen,
}, {
    initialRouteName: "main",
    defaultNavigationOptions: default_navigationOptions
  }
)
navi_stack_main.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
  };
};

const navi_stack_me = createStackNavigator({
  me: me_screen,
  feedback: FeedBackScreen,
  about: AboutUsScreen,
  mybook: MyBookScreen,
  pagenext:NavigationLearnPage
}, {
    initialRouteName: "me",
    defaultNavigationOptions: default_navigationOptions
  }
)


navi_stack_me.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
  };
};

const navi_plus = createStackNavigator({
  plus: AddNewOjectScreen
}, {
    initialRouteName: "plus",
    defaultNavigationOptions: default_navigationOptions
  }
)



const bottom_tabbar_stack = createBottomTabNavigator({
  main: navi_stack_main,
  plus: navi_plus,
  me: navi_stack_me
}, {
    initialRouteName: 'plus',
    tabBarPosition: "bottom",
    swipeEnabled: true,
    lazy: true,
    animationEnabled: true,
    navigationOptions: {

    },
    defaultNavigationOptions: ({
      navigation
    }) => ({
      tabBarIcon: ({
        focused,
        horizontal,
        tintColor
      }) => {
        const {
          routeName
        } = navigation.state;
        let iconName;
        let image;
        var style = {
          width: 25,
          height: 25
        };
        if (routeName === 'main') {
          iconName = "../assets/ic_bottom_home.png";
          image = require("../assets/ic_bottom_home.png");
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'me') {
          iconName = "../assets/ic_bottom_me.png";
          image = require("../assets/ic_bottom_me.png");
        } else {
          image = require("../assets/ic_bottom_plus.png");
          style = { width: 50, height: 50 }
        }

        // You can return any component that you like here!
        return <Image source={
          image
        }
          style={style}
          color={
            tintColor
          }
        />;
      },
    }),

    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: "red",
      inactiveTintColor: "#333333",
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: 'white',
      },

    }

  }

)

export default createAppContainer(bottom_tabbar_stack)