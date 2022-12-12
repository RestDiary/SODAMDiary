import React, { useEffect, useState } from 'react';
import {StyleSheet, Button, View, Text, Dimensions, ScrollView } from 'react-native';
import { Calendar ,LocaleConfig} from "react-native-calendars";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from './component/Card'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { API } from '../config.js'
import {dark, votanical, town} from './css/globalStyles';

const { width: SCREEN_WIDTH ,height:SCREEN_HEIGHT} = Dimensions.get('window');

function CalenderScreen({ navigation }) {
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
    // else if (selectedTheme === "votanical") setNowTheme(votanical);
    // else if (selectedTheme === "votanical") setNowTheme(votanical);
    // else if (selectedTheme === "votanical") setNowTheme(votanical);
    // else if (selectedTheme === "votanical") setNowTheme(votanical);
    // else if (selectedTheme === "votanical") setNowTheme(votanical);
}    
  const [diaryData, setDiaryData] = useState([]); //db에서 받아온 데이터 저장하는곳
  const [selectDay, setSelectDay] = useState([]); //선택한 캘린더
  const [loading, setLoading] = useState(false); //데이터 불러오는동안 로딩 표시
  const [reObjDiary, setReObjDiary] = useState([]); //선택한 다이어리 객체 재 리스트화 (사용)
  const [markingDate, setMarkingDate] = useState([]); // 날짜에 마킹한 객체를 집어넣는곳
  const [mergeObj, setMergeObj] = useState({});

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
        })
        .catch(function (error) {
          Alert.alert("❗error : bad response")
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

    //로그인 여부 확인 및 일기 불러오기
    useEffect(() => {
      getDiaryData()
      console.log("객체 0번째 출력")
      console.log(JSON.stringify(diaryData[0], null, 4))
      }, [])

      

      //데이터 불러오고 난후 캘린더에 쓴날 표시 → 객체 state에 집넣기
      useEffect(() => {
      
        let result =  {}
  
        setMarkingDate([])
  
        //마킹객체 생성
        for(var i=0 ;i<diaryData.length;i++ ){
          const year = diaryData[i].year;
          const month = ('0' + (diaryData[i].month)).slice(-2);
          const days = ('0' + diaryData[i].day).slice(-2);
          const reDiaryDate = year + '-' + month + '-' + days;
          // console.log(reDiaryDate); 잘뜸
          const temp = {[reDiaryDate] : {marked:true, disableTouchEvent:false}};
          Object.assign(result, temp)
        }
        setMarkingDate(result)
      }, [diaryData])


    //===================================================================================

  return (<>
    {markingDate &&
  <View style={{...styles.container,backgroundColor:nowTheme.bg}}>
    <View >
      <Calendar

        //데이터 마킹 (일기 쓴 날만 색 주기)
        markedDates={
          markingDate
        }

        //day press에서 실행되는 핸들러 기본값 = 정의되지 않음
        onDayPress={day => {
          // console.log('selected day', day);
          setSelectDay(day); //선택 한 날짜 2022-05-12 (0이 자동으로 붙어서 출력)
          setReObjDiary([]);
          for(let i = 0; i<diaryData.length;i++){
            
            //받아온 객체 날짜 데이터에 0 붙이기
            const year = diaryData[i].year;
            const month = ('0' + (diaryData[i].month)).slice(-2);
            const days = ('0' + diaryData[i].day).slice(-2);
            const reDiaryDate = year + '-' + month + '-' + days;
            // console.log(reDiaryDate,"   양옆 같은건가?   ",day.dateString)
            if(reDiaryDate===day.dateString){
              setReObjDiary(oldArray=>[...oldArray, diaryData[i]]);
            } 
          }
          // console.log("들어간 데이터는 = ", reObjDiary)
        }}


        //길게 눌러 실행되는 처리기. 기본값 = 정의되지 않음
        onDayLongPress={day => {
          console.log('long selected day', day);
        }}
        // 달력 제목의 월 형식. 서식 값: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy-MM'}
        // 달력에서 보이는 달이 바뀔 때 실행되는 핸들러. 기본값 = 정의되지 않음
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // 월 탐색 화살표 숨기기 기본 = 거짓
        hideArrows={true}
        // 월 페이지에 다른 달의 날짜를 표시하지 않습니다. 기본값 = 거짓
        hideExtraDays={true}
        // 캘린더 페이지에서 볼 수 있는 다른 달의 날짜. 기본값 = 거짓
        disableMonthChange={false}
        // firstDay=1인 경우 일주일은 월요일부터 시작합니다. dayNames 및 dayNamesShort는 여전히 일요일부터 시작해야 합니다.
        firstDay={0}
        // 비활성화된 날에는 모든 터치 이벤트를 비활성화합니다. markDates에서 disableTouchEvent로 재정의할 수 있습니다.
        disableAllTouchEventsForDisabledDays={false}
        // // 기본 월 및 연도 제목을 사용자 정의로 바꿉니다. 함수는 매개변수로 날짜를 받습니다.        
        // renderHeader={date => {
        //   return(
        //     <Text>date</Text>
        //   )
        // }}
        // 월간 스와이프 옵션을 활성화합니다. 기본값 = 거짓       
        enableSwipeMonths={true}


          
        
        />
        
    </View>
        <Text style={styles.textStyle}>{selectDay.dateString}</Text>
    {/* 카드 가로 뷰 */}
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView}  >
                  {/* 카드 버튼이벤트 */}
                  <View style={styles.notCard}></View>
                  {
                    reObjDiary&&
                    reObjDiary.map((my, index) => {
                      return <Card key={index} data={reObjDiary[index]} />
                    })
                  }
                  <View style={styles.notCard}></View>
                  


              </ScrollView>
            </SafeAreaView>
          </View>
    </View>
                }</>
  );
}

export default CalenderScreen;

const styles = StyleSheet.create({
  container:{
    // backgroundColor:'#0d1c38',
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,    
  },
  content:{
    
    
  },
  textStyle:{
    color:'#00000',
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
  },

  calendar:{
  }
})