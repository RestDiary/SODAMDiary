import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated, Alert, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Card from './component/Card';
import { getProfileData } from 'react-native-calendars/src/Profiler';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { API } from '../config.js'
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function DiaryScreen({ navigation }) {
  const [diaryData, setDiaryData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = React.useState("");

  //로그인 여부 확인 및 일기 불러오기
  useEffect(() => {
    getDiaryData()
  }, [])

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
        url: `${API.MYDIARY}`,
        params: {
          id: userId, //****작성자 id
        }
      }, null)
        .then(res => {
          setDiaryData(res.data)
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
            <Text style={styles.moonText}>{temp[0].month}월</Text>
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
                      return <Card key={index} data={temp[index]} />
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
    <View style={styles.container}>
      <SafeAreaView>
        {/* 세로 스크롤 뷰 */}
        <ScrollView>
          {/* 년도 */}
          <View style={styles.year}>
            {/*----------------------------<year>------------------------------  */}
            {/* 년 선택하는 것으로 변경예정 */}
            <Text style={styles.yearText}>2022</Text>
          </View>

          {loading && <ActivityIndicator size="large" color="white" />}

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

        </ScrollView>
      </SafeAreaView>
    </View>

  );
}

export default DiaryScreen;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#071D3A',
    flex: 1,
  },

  year: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yearText: {
    color: "#fff"
  },

  moon: {
    marginTop: 8,
  },

  moonText: {
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
    color: "#fff",
    fontSize: 24,
  },

  scrollView: {
    marginBottom: 16,
  },

  cardContainer: {
    height: (SCREEN_WIDTH/2)*2,
  },

  notCard:{
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 3,
  }
});