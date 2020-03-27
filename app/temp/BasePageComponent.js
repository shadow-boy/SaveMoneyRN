import React, {
    PureComponent,
    Fragment

} from 'react';
import {
    View, Text, Image, TextInput, TouchableHighlight,
    Button
} from 'react-native';

import styles from "../style/style_global"
import {navigationOptions} from "react-navigation"


export default class BasePageComponent extends PureComponent {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        let headerLeft = navigation.getParam("headerLeft", () => { });
        let headerRight = navigation.getParam("headerRight", () => { });
        return {
            title: navigation.getParam('title', 'title'),
            headerLeft: headerLeft(),
            headerRight: headerRight()
        };
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;

        // this.renderNavigationBar();

        this.navigation.setParams({ "headerLeft": this.headerLeft.bind(this) });

        this.navigation.setParams({ "headerRight": this.headerRight.bind(this) });

    }
    /**
     *设置导航栏的headerLeft
     *
     * @returns
     * @memberof BasePageComponent
     */
    headerLeft() {
        return (
            <TouchableHighlight
                underlayColor="transparent"
                activeOpacity={1}
                onPress={() => {
                    this.backPage()
                }}
            >
                <Image style={{ marginHorizontal: 11 }}
                    height={22}
                    width={12}
                    source={require("@assets/bt_back_white.png")}></Image>
            </TouchableHighlight>
        )
    }
    /**
     *设置导航栏的headerRight
     *
     * @returns
     * @memberof BasePageComponent
     */
    headerRight() {
        return null
    }

    /**
     *界面返回按钮点击方法
     *
     * @memberof BasePageComponent
     */
    backPage() {
        console.log("backPage --- BasePageComponent");
        let navigation = this.props.navigation;
        navigation.pop();
    }
    /**
     *设置一个navi header title
     * 
     * @param {string} [title="title"]
     * @memberof BasePageComponent
     */
    renderNavigationBar(title = "title") {
        console.log("renderNavigationBar", title)
        this.props.navigation.setParams({ title: title })
    }


    render() {
        console.log("render", "BasePageComponent");
        return (
            <Fragment>
                {this.renderContentView()}
            </Fragment>
        )
    }
    /**
     返回page 的content 部分的view
     *
     * @returns
     * @memberof BasePageComponent
     */
    renderContentView() {
        console.log("renderContentView ----BasePageComponent--- overwrite")

        return (<View style={styles.container}></View>)

    }
}

