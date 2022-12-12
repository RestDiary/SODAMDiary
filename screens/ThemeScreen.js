import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated, Alert, ActivityIndicator, Image } from 'react-native';
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

function ThemeScreen({ navigation }) {
  const [themeData, setThemeData] = useState([
    require("../assets/images/darkTheme.png"),
    require("../assets/images/votanicalTheme.png"),
    require("../assets/images/townTheme.png"),
    require("../assets/images/classicTheme.png"),
    require("../assets/images/purpleTheme.png"),
    require("../assets/images/blockTheme.png"),
    require("../assets/images/patternTheme.png"),
    require("../assets/images/magazineTheme.png"),
    require("../assets/images/winterTheme.png"),
  ]);
  const [themeTitle, setThemeTitle] = useState(["dark", "votanical", "town", "classic", "purle", "block", "pattern", "magazine", "winter"])

  //현재 선택한 테마 가져오기
  const [selectedTheme, setSelectedTheme] = useState("");
  useEffect(() => {
    getTheme()
  }, [])

  const getTheme = async () => {
    let temp = await AsyncStorage.getItem('theme');
    setSelectedTheme(temp)
  }

  // 적용 눌렀을 때 테마 저장
  const saveTheme = async (selected) => {
    await AsyncStorage.setItem('theme', JSON.stringify(selected));
    navigation.navigate("Home")
  }

  return (
    <>
      {themeData[0] &&
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal>

                <View style={styles.notCard}></View>
                {
                  // 테마카드 불러오기
                  themeData.map((my, index) => {
                    return (
                      <View key={index} style={{ ...styles.card }}>
                        {/* 테마 이미지 */}
                        <View style={{ ...styles.cardImageBox }}>
                          <Image source={themeData[index]} style={styles.imageSize} resizeMode={'stretch'}></Image>
                        </View>
                        {/* 테마 이름 */}
                        <View style={{ ...styles.themeTitle }}>
                          <Text style={{ ...styles.themeText }}>
                            {themeTitle[index]}
                          </Text>
                          {/* 테마 적용유무 */}
                          <TouchableOpacity onPress={(selected)=>saveTheme(themeTitle[index])} >
                            {selectedTheme.includes(themeTitle[index]) ? 
                            <Text style={{ ...styles.themeApply, backgroundColor: "#555" }}>적용중</Text>
                            :
                            <Text style={{ ...styles.themeApply,  }}>적용하기</Text>
                            }
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
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

export default ThemeScreen;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },

  cardContainer: {

  },

  notCard: {
    width: SCREEN_WIDTH / 15,
  },

  card: {
    width: SCREEN_WIDTH / 1.3,
    marginTop: 50,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 130,
    borderWidth: 1,
  },

  cardImageBox: {
    borderWidth: 1,
    borderColor: "white",
  },

  imageSize: {
    width: '100%',
    height: "100%",
  },

  themeTitle: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  themeText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  themeApply: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    borderWidth: 1,
    padding: 6,
    fontSize: 20,
  },

  themeApply: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    borderWidth: 1,
    padding: 6,
    fontSize: 20,
    textAlign: 'center',
  },
});