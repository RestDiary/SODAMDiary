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
import { useNavigation } from '@react-navigation/native';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function DetailScreen( Album ) {
  console.log("Album: ",Album.route.params.album);

  const navigation = useNavigation(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState("");
  const [voice, setVoice] = useState("");


  const richText = React.useRef();
  const [Emotions, setEmotions] = useState([]);




  useEffect(() => {
    detail();
  }, [])

  const detail = async () => {
    try {
      await axios({
        method: "post",
        url: `${API.DIARYINFO}`,
        params: {
          diarykey: Album.route.params.album
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
          console.log(res)
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (error) {
      console.log(error)
    }
  }

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



  //서버 요청 로딩
  const [loading, setLoading] = useState(false)


  return (
    <View style={styles.container}>
      {/* 제목 */}
      <SafeAreaView style={styles.titleLayout}>
        <Text
          placeholder="제목:"
          placeholderTextColor={"#456185"}
          style={styles.title}
          value={"title"}
          returnKeyType="next"
          maxLength={30}
          editable={false} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
        >제목: {title}</Text>
      </SafeAreaView>

      {/* 감정선택 */}
      <SafeAreaView style={styles.feelingLayout}>
        {/* 오늘의 기분 키워드 피커 */}
        <View>
          <Text style={{color:"white", margin:10}}>키워드: {keyword}</Text>
        </View>

        {/* 선택한 감정 보이는 곳 */}
        <View style={styles.feelingBtnBox}>
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
            <Text style={styles.date}>
            날짜: {year}년 {month}월 {day}일
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

   

      

      {/*--------------------- 에디터 --------------------- */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 0.8 }}>
        <SafeAreaView>
          <ScrollView>
            {/* {이미지 보이는 곳} */}
          <Pressable >
            {img && < Image source={{uri: img}} style={{ width: 200, height: 200 }} />}
        </Pressable>
            {/* 음성 플레이어 영역 */}
            {voice && <AudioPlayer audio={voice}></AudioPlayer>}
            {audio &&
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <AudioPlayer audio={audio}></AudioPlayer>
              </View>
            }

            <RichEditor
              ref={richText} // from useRef()
              placeholder={content}
              placeholderColor={"white"}
              androidHardwareAccelerationDisabled={true}
              editorStyle={{
                backgroundColor: "#071D3A",
                placeholderColor: "#456185",
                color: "white",
              }}
              style={{ ...styles.richTextEditorStyle }}
              initialHeight={SCREEN_HEIGHT / 2}
              disabled={true} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
              initialContentHTML={content}
              >
            </RichEditor>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

     
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
    width: SCREEN_WIDTH / 3,
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