import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Platform,
  Image
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen'

import styles from "@style/style_global";
import { loadAndQueryDB } from '../../utils/data_base_manager';

import { BallIndicator } from 'react-native-indicators';


export default class MainScreen extends Component {

static navigationOptions ={
   header:null,
}

constructor(props){
  super(props)
  loadAndQueryDB((list)=>{
    console.log(list)
    this.setState({
      data:[...list]
    })
    // console.log(SON.stringify(list))
  })

  this.state = {
    showIndicator:true,
    data:[]
  }

}

  componentDidMount() {
    console.log("componentDidMount");
  }


  _renderSectionHeader(info) {
    // console.log(info)

    return (
      // <Text key={info.section.key} style={model.sectionContainer}>
      //   {info.section.title}
      // </Text>
      <View style={model.sectionContainer}>
        <Text style={[{ fontSize: 12, color: "#999999", }]}>18年 7月2日 周二</Text>
        <Text style={[{ fontSize: 12, color: "#4D426D", }]}>支出390.00 收入0.00</Text>



      </View>
    )
  }


  _renderItem({ index, item, section }) {

    return (
      <View style={model.cellStyle}>
        <View style={model.left}>
          <Image source={require("../../assets/icon_Eatanddrink.png")} style={model.ImageItem}></Image>
          <View style={model.leftColumn}>
            <Text style={model.leftTitle}>服饰</Text>
            <Text style={model.leftDescption}>给自己买个小裙裙~</Text>


          </View>
        </View>
        <Text style={[model.right,{color:"#4D426D",fontSize:16,fontWeight:"600",textAlign:"right"}]}>298.00</Text>
      </View>
    )
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

    var dataSource = this.state.data;
    for (var i = 0; i < 5; i++) {
      let datas = [];
      for (var j = 0; j < 20; j++) {
        datas.push(`row_data -- ${j}`);
      }
      dataSource.push({ key: i, data: datas, title: `title_${i}` });
    }


    return (
      <Fragment>

        <View style={styles.container}>

          <View style={model.top_info}>
            <View style={model.top_info_center}>
              <View style={model.top_date_container}>
                <Text style={model.top_date_month}>M</Text>
                <Text style={model.top_date_day}>16</Text>
              </View>

              <View style={model.rightContainer}>

                <Text style={{ height: 30, color: "#fff", marginVertical: 5 }}>3月预算结余(元)</Text>
                <View style={{ height: 40 }}>
                  <Text style={{ fontSize: 20, color: "#fff", marginVertical: 10 }}>1,094.00</Text>
                </View>
                <View style={[{ height: 30, marginVertical: 5 }, model.rightBottomRow]}>
                  <Text style={{ color: "#fff" }}>3月支出：1,104.00</Text>
                  <Text style={{ color: "#fff" }}>3月收入：1,104.00</Text>
                </View>

              </View>

            </View>

          </View>
          <SectionList
            style={model.setctionList}
            renderSectionHeader={this._renderSectionHeader}
            renderItem={this._renderItem}
            sections={dataSource}
            // refreshing={false}
            // onRefresh={()=>{alert("刷新")}}
            // ItemSeparatorComponent={this._separatorCom}
            // SectionSeparatorComponent={() => <View style={{height: 20, backgroundColor: 'blue'}}></View>}
            keyExtractor={(item, index) => ("index" + index + item)}
          // onEndReached={(info)=>{alert("到达底部")}}
          // onEndReachedThreshold={0}
          // stickySectionHeadersEnabled={true}
          // ListHeaderComponent={() => <View
          //     style={{backgroundColor: 'yellow', alignItems: 'center',justifyContent: 'center',width:global.dimension.width,height:50}}><Text>这个是我的表头</Text></View>}
          // ListFooterComponent={() => <View
          //     style={{backgroundColor: 'red', alignItems: 'center',width:dimension.width}}><Text>这个是我的表尾</Text></View>}
          // contentContainerStyle={model.sectionListStyle}//设置cell的样式
          />


        </View>


      {this.showHudProgress(this.state.showIndicator)}

      </Fragment>
    )
  }
}




const model = StyleSheet.create({
  top_info: {
    height: 200,
    backgroundColor: "#F3AC87",
  },

  top_info_center: {
    marginHorizontal: 20,
    marginVertical: 40,
    flex: 1,
    flexDirection: "row",



  },
  setctionList: {
    backgroundColor: "#fff",

  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    backgroundColor: "#EFEFEF",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 40
      },
      android: {

      }
    })

    // paddingHorizontal: 24,
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
  sectionListStyle: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#dd6ddd',
  },

  top_date_container: {
    width: 60,
    alignSelf: "stretch",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    // flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",

  },
  top_date_month: {
    fontWeight: '600',
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 14,
    color: "#DD7943",
    opacity: 0.5
  },
  top_date_day: {
    fontWeight: '500',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: "#DD7943"
  },
  rightContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginLeft: 20,


  },
  rightBottomRow:
  {
    color: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "bottom",
    alignItems: "flex-end"

  },

  //cell item style

  cellStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ff496b',
    margin: 10,
    padding: 6,
  },
  ImageItem: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  left: {
    flex:3,
    flexDirection:"row",

  },

  leftColumn: {
    flexDirection: "column",
    flex: 1,
    marginLeft:10,
    justifyContent:"space-between",
    alignItems: "flex-start",
  },
  leftTitle: {
    color: "#333",
    fontSize: 15,
  },
  leftDescption: {
    color: "#999",
    fontSize: 14,
  },
  right: {
    flex:2,
    justifyContent: 'flex-end',
    paddingRight: 12,
    
  }



});
