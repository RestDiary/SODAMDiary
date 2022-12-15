import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated, Alert, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ShareCard from './component/ShareCard';
import { getProfileData } from 'react-native-calendars/src/Profiler';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { API } from '../config.js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';
import {YearPicker} from 'react-native-propel-kit';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function ShareScreen({ navigation }) {
   //테마
   useEffect(() => {
    getTheme()
  }, [])


  const [nowTheme, setNowTheme] = useState({});


  const getTheme = async () => {
    let selectedTheme = await AsyncStorage.getItem('theme');

    if (selectedTheme.includes("dark")) setNowTheme(dark);
    else if (selectedTheme.includes("votanical")) setNowTheme(votanical);
    else if (selectedTheme.includes("town")) setNowTheme(town);
    else if (selectedTheme.includes("classic")) setNowTheme(classic);
    else if (selectedTheme.includes("purple")) setNowTheme(purple);
    else if (selectedTheme.includes("block")) setNowTheme(block);
    else if (selectedTheme.includes("pattern")) setNowTheme(pattern);
    else if (selectedTheme.includes("magazine")) setNowTheme(magazine);
    else if (selectedTheme.includes("winter")) setNowTheme(winter);
  }
  const [diaryData, setDiaryData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataTmp, setDataTmp] = useState([]);
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = React.useState("");
  const isFocused = useIsFocused();
  const [year, setYear] = useState(2022);

  //로그인 여부 확인 및 일기 불러오기
  useEffect(() => {
    getDiaryData()
  }, [isFocused])

  useEffect(() => {
    getDiaryData()
  }, [year])

  // const isLogin = async () => {
  //   const userId = await AsyncStorage.getItem('id')
  //   if (userId) {
  //     setUserId(userId)
  //   }
  // }

  //일기 data 요청
  const getDiaryData = async () => {
    setLoading(true)
    const userId = await AsyncStorage.getItem("id");
    try {
      await axios({
        method: "post",
        url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/myShare',
        params: {
          id: userId, //****작성자 id
          year: year,
        }
      }, null)
        .then(res => {
          setDiaryData(res.data)
          setDataTmp(res.data)
          console.log("들어온",res.data)
        })
        .catch(function (error) {
          Alert.alert("❗error : bad response")
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  //검색 기능
  const updateSearch = (search) => {
    setSearch(search)

    let temp = [...dataTmp]; //temp를 원본 객체를 계속 지원해준다. 출력은 diaryData에서 하기때문에

    // console.log(temp[0].content);
    // const filterTitle = diaryData.filter((p)=>{
    //   return p.content.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ",""))
    // })
    console.log(search);

    const filterTitle = temp.filter((p) => {
      return p.content.includes(search)
    })
    console.log(filterTitle);
    setDiaryData(filterTitle);
  }

  //일기 map 돌리기
  function getDiary(month) {
    let temp = [...diaryData]
    temp = temp.filter((i) =>
      i.month === month
    )

    if (temp.length < 0) {
      return
    }

    return (

      <>
        {temp[0] &&
          <View style={styles.moon}>
            <View style={{marginLeft:10, marginRight:10, borderRadius:10 ,backgroundColor:nowTheme.btn }}>
              <Text style={{ ...styles.moonText, color: nowTheme.font }}>{temp[0].month}월</Text>
            </View>
            <View style={styles.cardContainer}>
              <SafeAreaView>
                {/* 가로 스크롤 뷰 */}
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal style={styles.scrollView} >
                  {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 , 한칸을 투명하게 카드하나 더 만들면 양쪽으로 온다*/}
                  <View style={styles.notCard}></View>
                  {
                    temp.map((my, index) => {
                      return <ShareCard key={index} data={temp[index]} />
                    })
                  }
                  <View style={styles.notCard}></View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        }
      </>
    )
  }

  return (
    <>

      <View>
        <SearchBar value={search} onChangeText={(search) => updateSearch(search)} placeholder=" 내용을 검색해보세요 "></SearchBar>
      </View>
      {/* <ImageBackground style={{ ...styles.container, backgroundColor: nowTheme.cardBg, width:SCREEN_WIDTH, height:SCREEN_HEIGHT }} source={nowTheme.image} resizeMode={'cover'}> */}
        <SafeAreaView style={{ ...styles.container, backgroundColor: nowTheme.cardBg }}>
          <ScrollView >
            <View style={{alignItems: 'center',
    justifyContent: 'center',}}>
              {/* 세로 스크롤 뷰 */}
              {loading && <ActivityIndicator size="large" color="white" />}
              {/* 년도 */}
              <View style={{ ...styles.year, borderBottomWidth:1, borderColor:nowTheme.cardBorder, marginBottom:16, }}>
                {/*----------------------------<year>------------------------------  */}
                {/* 년 선택하는 것으로 변경예정 */}
                <TouchableOpacity>
            <YearPicker style={{ ...styles.yearText, color: nowTheme.font, height:SCREEN_HEIGHT/14 }} title="년도 선택" value={year} onChange={setYear} />
            </TouchableOpacity>
              </View>
              <View>
                {getDiary(12)}
                {getDiary(11)}
                {getDiary(10)}
                {getDiary(9)}
                {getDiary(8)}
                {getDiary(7)}
                {getDiary(6)}
                {getDiary(5)}
                {getDiary(4)}
                {getDiary(3)}
                {getDiary(2)}
                {getDiary(1)}
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      {/* </ImageBackground> */}
    </>
    
  );
}

export default ShareScreen;


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#071D3A',
    flex: 1,
  },

  searchBar: {
    backgroundColor: "#fff"
  },

  year: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yearText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH / 14,
    fontWeight: 'bold',
  },

  moon: {

  },

  moonText: {
    margin: 16,
    color: "#fff",
  },

  scrollView: {
    marginBottom: 16,
  },

  cardContainer: {
    height: (SCREEN_WIDTH / 1.8) * 2,
  },

  notCard: {
    width: SCREEN_WIDTH / 5.4,
    height: SCREEN_HEIGHT / 5.4,
  }
});
