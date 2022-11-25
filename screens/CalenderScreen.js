import * as React from 'react';
import {StyleSheet, Button, View, Text, Dimensions, ScrollView } from 'react-native';
import { Calendar } from "react-native-calendars";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from './component/Card'



const { width: SCREEN_WIDTH ,height:SCREEN_HEIGHT} = Dimensions.get('window');

function CalenderScreen({ navigation }) {
  return (
  <View style={styles.container}>
    <View >
      <Calendar
        // 처음에 보이는 달. default = 지금
        // initialDate={'2022-11-24'}
        // 선택할 수 있는 최소 날짜, 이전 날짜는 회색으로 표시 기본= 표시 안됨
        // 일기를 적기 시작한 날 시작
        minDate={'2022-10-10'}
        // 선택할 수 있는 최대 날짜 , 이후 날짜는 회색을 표시 기본 = 표시안됨
        // 오늘 날짜를 최대로 선정
        maxDate={'2022-12-12'}
        //day press에서 실행되는 핸들러 기본값 = 정의되지 않음
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // 월 탐색 화살표 숨기기 기본 = 거짓
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={true}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={true}
        // Disable right arrow. Default = false
        disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => {
          /*Return JSX*/
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </View>
        <Text style={styles.textStyle}>XXXX년 XX월 XX일 X요일</Text>
    {/* 카드 가로 뷰 */}
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView}  >
                  {/* 카드 버튼이벤트 */}
                  <View style={styles.notCard}></View>
                  <Card id='1'></Card>
                  <View style={styles.notCard}></View>
              </ScrollView>
            </SafeAreaView>
          </View>
    </View>
  );
}

export default CalenderScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#0d1c38',
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,    
  },
  content:{
    
    
  },
  textStyle:{
    color:'#fff',
    padding:SCREEN_WIDTH/10
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
    height: SCREEN_HEIGHT / 2,
  },
  notCard:{
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 3,
  }
})