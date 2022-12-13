import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, RichText, Alert, Image } from 'react-native';
import { actions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Chip } from 'react-native-paper';
import { API } from '../config.js'
import Modal from "react-native-modal";
import AudioRecorder from './component/AudioRecorder';
import * as ImagePicker from 'expo-image-picker';
import AudioPlayer from './component/AudioPlayer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function DetailScreen( card ) {
  //스크린 이동할 때 lifecycle 실행
  const isFocused = useIsFocused();
  
       //테마
    useEffect(() => {
      getTheme()
    }, [isFocused])
  
  const [nowTheme, setNowTheme] = useState({});
  const [editorColor, setEditorColor] = useState({})

  //테마, 에디터 컬러 가져오기
  const getTheme = async () => {
    let selectedTheme = await AsyncStorage.getItem('theme');
    let editorOption = {}

    if (selectedTheme.includes("dark")) {
      setNowTheme(dark);
      editorOption = {
        backgroundColor: dark.cardBg,
        placeholderColor: "#456185",
        color: dark.font,
      }
    } 

    else if (selectedTheme.includes("votanical")){
      setNowTheme(votanical);
      editorOption = {
        backgroundColor: votanical.cardBg,
        placeholderColor: "#456185",
        color: votanical.font,
      }
    } 

    else if (selectedTheme.includes("town")){
      setNowTheme(town);
      editorOption = {
        backgroundColor: town.cardBg,
        placeholderColor: "#456185",
        color: town.font,
      }
    }

    else if (selectedTheme.includes("classic")){
      setNowTheme(classic);
      editorOption = {
        backgroundColor: classic.cardBg,
        placeholderColor: "#456185",
        color: classic.font,
      }
    }

    else if (selectedTheme.includes("purple")){
      setNowTheme(purple);
      editorOption = {
        backgroundColor: purple.cardBg,
        placeholderColor: "#456185",
        color: purple.font,
      }
    }

    else if (selectedTheme.includes("block")){
      setNowTheme(block);
      editorOption = {
        backgroundColor: block.cardBg,
        placeholderColor: "#456185",
        color: block.font,
      }
    }

    else if (selectedTheme.includes("pattern")){
      setNowTheme(pattern);
      editorOption = {
        backgroundColor: pattern.cardBg,
        placeholderColor: "#456185",
        color: pattern.font,
      }
    }

    else if (selectedTheme.includes("magazine")){
      setNowTheme(magazine);
      editorOption = {
        backgroundColor: magazine.cardBg,
        placeholderColor: "#456185",
        color: magazine.font,
      }
    }

    else if (selectedTheme.includes("winter")){
      setNowTheme(winter);
      editorOption = {
        backgroundColor: winter.cardBg,
        placeholderColor: "#456185",
        color: winter.font,
      }
    }

    else {
      setNowTheme(dark);
      editorOption = {
        backgroundColor: dark.cardBg,
        placeholderColor: "#456185",
        color: dark.font,
      }
    }

    setEditorColor(editorOption)
  }

  
  const voice = require("../assets/images/voice.png");
  const [titleText, onChangeTitleText] = useState("");
  const [feelingText, onChangeFeelingText] = useState("");
  const richText = React.useRef();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Emotions, setEmotions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [id, setId] = useState("");
  const navigation = useNavigation(); 


  //이미지 업로드용
  const [image,setImage]  = useState("");
  const [send,setSend] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const formData = new FormData();
  let url = ""; //서버에서 받아올 aws이미지 경로

  //일기 내용 저장
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState("");
  const [voice2, setVoice] = useState("");


  useEffect(() => {
    detail();
  }, [])

  const detail = async () => {
    try {
      await axios({
        method: "post",
        url: `${API.DIARYINFO}`,
        params: {
          diarykey: card.route.params.card.diarykey
        }
      }, null)
        .then(res => {
          setTitle(res.data[0]["title"]);
          setContent(res.data[0]["content"]);
          setMonth(res.data[0]["month"]);
          setYear(res.data[0]["year"]);
          setDay(res.data[0]["day"]);
          setImg(res.data[0]["img"]);
          setKeyword(res.data[0]["keyword"]);
          setVoice(res.data[0]["voice"]);

        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (error) {
      console.log(error)
    }
  }


  //일기 삭제
  const deletDiary = () => {
    let lmgkey = image.split("com/");
    axios({
      method: "post",
      url: `${API.DELETE}`,
      params: {
        diarykey: card.route.params.card.diarykey,
        imgKey: lmgkey[1],

      }
    }, null)
      .then(res => {
        console.log("삭제함");
        Alert.alert("삭제되었습니다.")
        navigation.replace('Diary')
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  //삭제 알림창
  const alertDelete = () => {
    Alert.alert(
      "일기를 삭제하시겠어요?",
      "삭제한 일기는 복구할 수 없어요!",
      [                           
        {
          text: "네",                              
          onPress: () => deletDiary(),    
          style: "cancel"
        },
        { text: "아니오", onPress: () => console.log("안한대") }, 
      ],
      { cancelable: false }
    )
    
  }

  //링크이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen)
  }

  //Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  //키워드 제거
  const delEmotion = (keyword) => {
    let temp = [...Emotions]
    setEmotions(temp.filter((i) => i !== keyword))
  }



  //자식에서 부모에게 Audio 데이터 전달
  const [audio, setAudio] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const getAudio = (audio, isRecording) => {
    setAudio(audio)
    setIsRecording(isRecording)
  }

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

   //id값 꺼내오기
   useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      setId(result);
    });
  }, [])

  //서버 요청 로딩
  const [loading, setLoading] = useState(false)


  return (
    <View style={{...styles.container, backgroundColor:nowTheme.cardBg}}>
      {/* 제목 */}
      <SafeAreaView style={styles.titleLayout}>
        <Text
          placeholder="제목:"
          placeholderTextColor={"#456185"}
          style={{...styles.title, color:nowTheme.font, fontWeight: "bold"}}

          onChangeText={onChangeTitleText}
          value={"data.title"}
          returnKeyType="next"
          maxLength={30}
          editable={false} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
        >제목: {card.route.params.card.title}</Text>
      </SafeAreaView>

      {/* 감정선택 */}
      <SafeAreaView style={styles.feelingLayout}>
        {/* 오늘의 기분 키워드 피커 */}
        <View>
          <Text style={{color:nowTheme.font, margin:10}}>키워드: {card.route.params.card.keyword}</Text>
        </View>

        {/* 선택한 감정 보이는 곳 */}
        <View style={{...styles.feelingBtnBox,color:nowTheme.font}}>
          {Emotions &&
            Emotions.map((emo, index) => {
              return (
                <Chip compact='true' onClose={(keyword) => delEmotion(emo)}>
                  {"emoFunc"}
                </Chip>
              )
            })
          }
        </View>
      </SafeAreaView>

      {/* 날짜 */}
      <SafeAreaView style={styles.extendLayout}>
        <View style={styles.dateLayout}>
          <TouchableOpacity>
            <Text style={{...styles.date,color:nowTheme.font}}>
            날짜: {card.route.params.card.year}년 {card.route.params.card.month}월 {card.route.params.card.day}일
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

   

      

      {/*--------------------- 에디터 --------------------- */}
      {editorColor.backgroundColor &&
      <>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 0.8 }}>
        <SafeAreaView>
          <ScrollView>
            {/* {이미지 보이는 곳} */}
          <Pressable >
            {card.route.params.card.img && < Image source={{uri: card.route.params.card.img}} style={{ width: 200, height: 200 }} />}
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Pressable>
            {/* 음성 플레이어 영역 */}
            {card.route.params.card.voice && <AudioPlayer audio={card.route.params.card.voice}></AudioPlayer>}
            {audio &&
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <AudioPlayer audio={audio}></AudioPlayer>
              </View>
            }

            <RichEditor
              ref={richText} // from useRef()
              onChange={richTextHandle}
              placeholder={card.route.params.card.content}
              placeholderColor={"white"}
              androidHardwareAccelerationDisabled={true}
              editorStyle={editorColor}
              style={{ ...styles.richTextEditorStyle }}
              initialHeight={SCREEN_HEIGHT / 2}
              disabled={true} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
              initialContentHTML={card.route.params.card.content}
              >
            </RichEditor>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* 수정 버튼 */}
      <View style={{...styles.saveButtonView}}>
        <TouchableOpacity
          style={{...styles.saveButtonStyle, backgroundColor:nowTheme.btn}}
          onPress={() => navigation.navigate('Modify',  {card: card})}>
          <Text style={{...styles.textButtonStyle}}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={{...styles.saveButtonStyle, backgroundColor:nowTheme.btn}}
          onPress={alertDelete}>
          <Text style={styles.textButtonStyle}>삭제</Text>
        </TouchableOpacity>
      </View>
      </>}
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  errorTextStyle: {
    color: "#fff",
  },

  keyboardButtonView: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 12,
    marginBottom: 8
  },

  saveButtonView: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection:"row",
  },

  saveButtonStyle: {
    backgroundColor: "#456185",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  headerStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#152F5E",
  },

  container: {
    backgroundColor: '#071D3A',
    flex: 1,
  },

  title: {
    color: "white",
    fontSize: SCREEN_HEIGHT / 30,
    height: SCREEN_HEIGHT / 16,
    padding: 10,
  },

  titleLayout: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 20,
  },

  extendLayout: {
    flexDirection: 'row',
  },

  feelingLayout: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 2,
    flexDirection: 'row',
  },

  feeling: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 50,
    color: "#456185",
    padding: 10,
  },

  feelingBtnBox: {
    flexDirection: 'row',
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 14.5,
    color: "#456185",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  date: {
    width: SCREEN_WIDTH,
    color: "white",
    padding: 10,
  },

  dateLayout: {
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 2,
    marginTop: SCREEN_HEIGHT / 40,
  },

  contents: {
    padding: 10,
    flexShrink: 1,
    color: "white",
  },

  modalView: {
    flex: 0.3,
    backgroundColor: '#456185',
    justifyContent: 'center',
    alignItems: 'center'
  },
});