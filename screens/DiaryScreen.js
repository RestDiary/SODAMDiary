import React from 'react';

import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Card from './component/Card';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


function DiaryScreen({ navigation }) {
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

        {/* 달 */}
        <View style={styles.moon}>
          {/*----------------------------<moon>------------------------------  */}
          <Text style={styles.moonText}>12월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >
                  {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
                  <Card id='1'></Card>
                  <Card id='1'></Card>
                  <Card id='1'></Card>
                  <Card id='1'></Card>
                  <Card id='1'></Card>
                  <Card id='1'></Card>
              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>11월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                {/*----------------------------</day>-----------------------------  */}
              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>10월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
                  <Card id='1'></Card>
                  <Card id='1'></Card>
                {/*----------------------------</day>-----------------------------  */}

              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>9월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>
                <Card id='1'></Card>

                {/*----------------------------</day>-----------------------------  */}
              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}
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
    height: SCREEN_HEIGHT / 3,
  },
});