import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated, Alert, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ShareCardAll from './component/ShareCardAll';
import { getProfileData } from 'react-native-calendars/src/Profiler';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { API } from '../config.js'
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused, useNavigation} from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function ShareAllScreen( share ) {
  //테마
  useEffect(() => {
    getTheme()
  }, [])

  const [nowTheme, setNowTheme] = useState({});
  const isFocused = useIsFocused();

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

  console.log("share", share.route.params.share.keyword);

  const [diaryData, setDiaryData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = React.useState("");

  //로그인 여부 확인 및 일기 불러오기
  useEffect(() => {
    isLogin();
    getDiaryData();
  }, [isFocused])

  const isLogin = async () => {
    const userId = await AsyncStorage.getItem('id')
    if (userId) {
      setUserId(userId)
    }
  }

  //일기 data 요청
  const getDiaryData = async () => {
    setLoading(true)
    const userId = await AsyncStorage.getItem("id");
    try {
      await axios({
        method: "post",
        url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/shareList',
        params: {
          diarykey: share.route.params.share.diarykey,
        }
      }, null)
        .then(async res => {
          let positive = res.data[0].positive;
          let negative = res.data[0].negative;
          let neutral = res.data[0].neutral;

          let emotionMax = Math.max(positive, negative, neutral);

          await axios({
            method: "post",
            url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/shareList2',
            params: {
              id: userId,
              emotion: share.route.params.share.emotion, 
              emotionValue: emotionMax,
            }
          }, null)
            .then(res => {
              setDiaryData(res.data)
            })
            .catch(function (error) {
              Alert.alert("❗error : bad response")
            })


        })
        .catch(function (error) {
          Alert.alert("❗error : bad response")
        })
    } catch (error) {
      console.log(error)
    } 
    setLoading(false)
  }

  //일기 map 돌리기
  function getDiary(emotion) {
    let temp = [...diaryData]
    temp = temp.filter((i) =>
      i.emotion === share.route.params.share.emotion
    )

    if (temp.length < 0) {
      return
    }

    return (
      <>
        {temp[0] &&
          <View style={styles.moon}>
            <View style={{ marginLeft:10, marginRight:10, borderRadius:10 ,backgroundColor:nowTheme.btn }}>
              <Text style={{...styles.moonText,color: nowTheme.font }}>{temp[0].emotion}</Text>
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
                      return <ShareCardAll key={index} data={temp[index]} />
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
    <SafeAreaView style={{ ...styles.container, backgroundColor: nowTheme.cardBg }}>
        {/* 세로 스크롤 뷰 */}
        <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop:40,}}>

          {loading && <ActivityIndicator size="large" color="white" />}

          <View>
            {getDiary(share.route.params.share.keyword)}
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    

  );
}

export default ShareAllScreen;

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