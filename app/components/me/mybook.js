import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    FlatList,
    TextInput,
    TouchableHighlight,
    processColor,
    Dimensions, Button
} from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import styles from "@style/style_global";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';


const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
        borderRadius: 16
    }
}



export default class MyBookScreen extends Component {
    // static navigationOptions = {
    //     title: "My Books",
    //     headerRight:<TouchableHighlight
    //     underlayColor="clear"
    //     onPress={()=>{
    //         console.log("event right action")
    //     }}>
    //         <Image source={require("../../assets/bt_share.png")} 
    //         style={{marginRight:20,width:25,height:25}}>
    //         </Image>
    //     </TouchableHighlight>


    // }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "My Books",
           
            headerRight: <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                    console.log("event right action")
                }}>
                <Image source={require("../../assets/bt_share.png")}
                    style={{ marginRight: 20, width: 25, height: 25 }}>
                </Image>
            </TouchableHighlight>
        }


    }

    constructor(props) {
        super(props)

    }

    renderItem({ index, item, separators }) {
        return (
            <View style={model.item}>
                <Text style={model.item_month}>{item.month}</Text>
                <Text style={model.item_day}>{item.day}</Text>

            </View>
        )
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }


    render() {

        const data = [
            { name: 'Seoul', population: 215, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 10 },
            { name: 'Toronto', population: 28, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 10 },
            { name: 'Beijing', population: 52, color: 'gray', legendFontColor: '#7F7F7F', legendFontSize: 10 },
            { name: 'New York', population: 853, color: '#ddd333', legendFontColor: '#7F7F7F', legendFontSize: 10 },
            { name: 'Moscow', population: 119, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 10 }
        ]

        const { width } = Dimensions.get('window');

        var data_date = []
        for (let index = 0; index < 20; index++) {
            data_date.push({ month: "M", day: `${index}` })
        }
        return (
            <Fragment>
                <View style={[styles.container, { backgroundColor: "#F3AC87" }]}>
                    <View style={model.listContainer}>
                        <FlatList
                            data={data_date}
                            renderItem={this.renderItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        ></FlatList>
                    </View>
                    <View style={[model.countContainer]}>
                        <PieChart
                            data={data}
                            width={width}
                            height={model.test.height}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                        // absolute
                        />

                    </View>


                </View>
            </Fragment>
        )
    }
}


const model = StyleSheet.create({
    listContainer: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#F3AC87",
        justifyContent: "center",
        alignItems: "center"
    },
    countContainer: {
        flex: 3,
        alignSelf: "stretch",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        // justifyContent: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: "white",
        opacity: 0.5,
        borderRadius: 25,
        marginVertical: 40,
        marginHorizontal: 5,
        width: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    item_month: {
        fontSize: 14,
        color: "#DD7943",
        fontWeight: "600",
    },
    item_day: {
        marginTop: 5,
        fontSize: 14,
        color: "#DD7943",
        fontWeight: "500",

    },
    test: {
        backgroundColor: '#d3d333',
        width: global.width,
        height: 220,
        alignSelf: "center",
    }
})