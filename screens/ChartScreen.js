import React, { useEffect, useState } from 'react';
import { Button, View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLineChart from './component/charts/MyLineChart';
import MyBarChart from './component/charts/MyBarChart';
import MyPieChart from './component/charts/MyPieChart';
import MyContributionGraph from './component/charts/MyContributionGraph';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function ChartScreen({ navigation }) {
  const [nowTheme, setNowTheme] = useState({});

  //테마
  useEffect(() => {
    getTheme()
  }, [])

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

  return (
    <View style={{ ...styles.container, backgroundColor: nowTheme.cardBg }}>
      <SafeAreaView>
        <ScrollView>
          {/* 나의 감정 점수 */}
          <View style={styles.emotionScoreView}>
            <Text> {"현기"}님의 감정점수는 {"80"}점이에요. </Text>
          </View>

          {/* 파이차트 */}
          <View style={{ marginTop: 13 }}>
            <Text style={styles.whiteText}>감정 비율</Text>
          </View>
          <MyPieChart />

          {/* 라인차트 */}
          <View style={{marginTop:5}}>
            <Text style={styles.whiteText}>감정 변화</Text>
          </View>
          <MyLineChart/>

          {/* 막대차트 */}
          <View style={{ marginTop: 18 }}>
            <Text style={styles.whiteText}>자주 사용한 키워드</Text>
          </View>
          <MyBarChart />

          {/* 기여그래프 */}
          <View style={{ marginTop: 18}}>
            <Text style={{...styles.whiteText}}>일기 통계</Text>
            <View style={{marginTop:7}}/>
          </View>
          <MyContributionGraph/>

          <View style={{height:SCREEN_HEIGHT/25}}/>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#071D3A',
  },
  emotionScoreView:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
    width: SCREEN_WIDTH/1.05,
    height:SCREEN_HEIGHT/9,
    borderRadius: 16,
    backgroundColor:'green'
  },
  whiteText:{
    marginLeft:3,
    color:'white',
    fontSize:16,
  }

})