import React, { Fragment, Component } from 'react';
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
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import styles from "@style/style_global";
import { addOneConsumeToDB } from "../../utils/data_base_manager";

import Toast from 'react-native-root-toast';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

// import SQLite from 'react-native-sqlite-storage';


const ImageWH = (global.width - 20 * 6) / 6;

export default class AddNewOjectScreen extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add one",
            headerRight: <Text style={{ marginRight: 20, fontWeight: "500", color: "white" }}
                onPress={() => {
                    // console.log(navigation,"navigation");
                    // console.log("props ----");
                    // console.log(navigation.props)

                    let save = navigation.getParam("navigatePress", null)
                    save();
                }}>Save</Text>
        };
    }



    constructor(props) {
        super(props)
        this.categories = [
            "Eat and drink",
            "Traffic",
            "Apparel",
            "Shopping",
            "Entertainment",
            "Utility",
            "Commodity",
            "Housing",
            "Beauty",
            "Learning",
            "Travel",
            "Other"
        ]

        this.imageSource = [
            require("../../assets/icon_Eatanddrink.png"),
            require("../../assets/icon_Traffic.png"),
            require("../../assets/icon_Apparel.png"),
            require("../../assets/icon_Shopping.png"),
            require("../../assets/icon_Entertainment.png"),
            require("../../assets/icon_Utility.png"),
            require("../../assets/icon_Commodity.png"),
            require("../../assets/icon_Housing.png"),
            require("../../assets/icon_Beauty.png"),
            require("../../assets/icon_Learning.png"),
            require("../../assets/icon_Travel.png"),
            require("../../assets/icon_Other.png")
        ]

        console.log(this.imageSource)

        this.state = {
            moneyCount: null,
            date: null,
            accountType: 0,
            cate_index: 0,
            note: "",
            is_hud_visible: false,

        }

        this.props.navigation.setParams({ navigatePress: this.saveToDataBase.bind(this) })


    }


    saveToDataBase() {
        console.log("onpress")
        console.log(this.state);
        let date_current = new Date()

        let timestamp = Date.parse(date_current)/1000;
        let date_formate_string = date_current.toLocaleDateString().replace(/\//g, '-');

        let para = {
            time_stamp: timestamp,
            account_type: this.state.accountType,
            consume_type: this.state.cate_index,
            amount: this.state.moneyCount,
            note: this.state.note.toString(),
            date_formate_string: date_formate_string
        }
        this.setState({
            is_hud_visible:true
        })

        addOneConsumeToDB(para)
      
        setTimeout(() => {
            this.setState({
                is_hud_visible:false
            })
            Toast.show("save to database successfully",{position:Toast.positions.CENTER,duration:1000})


        }, 1500);
        
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight
                underlayColor="white"
                onPress={() => {
                    console.log(index, item)
                    this.setState({
                        cate_index: index
                    })
                }}
            >
                <Image style={model.secode_cate_item} source={item}></Image>

            </TouchableHighlight>
        )
    }

    renderAccountTypeItems() {
        let titles = ["Cash", "WeChat", "Alipay", "Credit Card", "Debit Card"]
        var labelArray = []
        for (let index = 0; index < titles.length; index++) {
            let label = <Text style={this.state.accountType === index ?
                model.third_account_list_item_select :
                model.third_account_list_item}
                onPress={() => {
                    console.log(index, "select-index ---- -");
                    this.setState({
                        accountType: index
                    })
                }}
            >{titles[index]}</Text>

            labelArray.push(label)

        }
        return labelArray;
    }

 showHudProgress(isShow) {
        if (isShow) {
            return (
                <BallIndicator color='red'
                    style={model.hud}
                />
            );
        }
        return null;

    }

    render() {

        return (
            <Fragment>
                <View style={[styles.container, { backgroundColor: "#FEF7F3" }]}>
                    <View style={model.first}>
                        <View style={model.first_left}>
                            <Image
                                style={model.first_image}
                                source={this.imageSource[this.state.cate_index]}>

                            </Image>
                            <Text style={model.first_title}>{this.categories[this.state.cate_index]}</Text>
                        </View>
                        <View style={model.first_right}>
                            <Text style={[model.first_input]}>$</Text>
                            <TextInput style={model.first_input}
                                placeholder="Input cost Count"
                                keyboardType="decimal-pad"
                                value={this.moneyCount}
                                onChangeText={(value) => {
                                    this.setState({
                                        moneyCount: value
                                    })
                                }}
                            ></TextInput>
                        </View>

                    </View>


                    <View style={model.second}>
                        <FlatList
                            horizontal={false}
                            scrollEnabled={false}
                            numColumns={6}
                            columnWrapperStyle={{ marginVertical: 5 }}
                            data={this.imageSource}
                            renderItem={this.renderItem.bind(this)}
                        ></FlatList>
                    </View>

                    <View style={model.third}>
                        <View style={model.third_date}>
                            <Image style={{ marginLeft: 10, height: 16, width: 16 }} source={require("../../assets/icon_date.png")}></Image>
                            <Text style={{ marginLeft: 10, color: "#4D426D", fontSize: 12, }}
                                onPress={() => {
                                    console.log("open date picker")



                                }}
                            >Date</Text>
                            <TextInput style={{ marginLeft: 10, fontSize: 12, }}
                                placeholder="Please enter a note"
                                value={this.state.note}
                                onChangeText={(value) => {
                                    this.setState({
                                        note: value
                                    })
                                }}
                            ></TextInput>
                        </View>

                        <View style={model.third_date}>
                            <Image style={{ marginLeft: 10, height: 16, width: 16 }} source={require("../../assets/icon_date.png")}></Image>
                            <Text style={{ marginLeft: 10, color: "#4D426D", fontSize: 12, }}>Account selection:</Text>
                        </View>

                        <View style={model.third_account_list}>{this.renderAccountTypeItems()}</View>

                    </View>


                </View>

                {this.showHudProgress(this.state.is_hud_visible)}

            </Fragment>
        )
    }

}

const model = StyleSheet.create({
    first: {
        backgroundColor: "white",
        alignSelf: "stretch",
        height: 60,
        //  flex:1,
        flexDirection: "row",
        alignItems: 'center',


    },
    first_image: {
        height: ImageWH,
        width: ImageWH,
        borderRadius: ImageWH / 2,
        marginLeft: 10,
    },
    first_title: {
        color: "#333333",
        fontSize: 15,
        marginLeft: 15,

    },
    first_left: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    first_right: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20,
    },
    first_input: {
        fontSize: 16,
        color: "#4D426D",
        marginLeft: 5
    },

    second: {
        marginTop: 20,
        backgroundColor: "#fff"
        // height: 200,
    },
    secode_cate_item: {
        width: ImageWH,
        height: ImageWH,
        padding: 10,
        margin: 10,


    },


    third: {
        marginTop: 20,
        backgroundColor: "white",
        // flex: 1,
        justifyContent: "flex-start"
    },
    third_date: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },

    third_account_list: {
        flexDirection: "row",
        paddingHorizontal: 30,
        justifyContent: "space-around",
        marginBottom: 20,

    },
    third_account_list_item: {
        fontSize: 12,
        backgroundColor: "#DEDEDE",
        color: "#666666",
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,

    },
    third_account_list_item_select: {
        fontSize: 12,
        backgroundColor: "#4D426D",
        color: "white",
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,

    },
    hud: {
        position: "absolute",
        width: 40,
        height: 40,
        left: global.width / 2 - 40 / 2,
        top: global.height / 2 - 40 / 2 - 20,


    }



})
