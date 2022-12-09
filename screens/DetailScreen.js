import React, { useState } from 'react';
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


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function DetailScreen({ navigation }) {
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

  //이미지 업로드용
  const [image,setImage] = useState("");
  const [send,setSend] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const formData = new FormData();
  let url = ""; //서버에서 받아올 aws이미지 경로

  //내 갤러리에서 사진 선택
  const pickImage = async () => {
    
    if(!status.granted){ // status로 권한이 있는지 확인
      const permission = await requestPermission();
      if(!permission.granted){
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      allowsEditing : false,
      quality : 1,
      aspect : [1,1]   
    });

    if(result.canceled){
      return null;  
    }

    setImage(result.assets[0].uri);

    const localUri = result.assets[0].uri;

    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    // const formData = new FormData();
    formData.append('image' , {uri: localUri,name: filename, type});
    setSend(formData);
    console.log(formData);
    console.log(localUri);
    console.log(filename);  
    console.log(type);
      
  };

  //링크이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen)
  }

  //Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //감정 키워드 추가
  const addEmotion = (keyword) => {
    if (Emotions.length >= 3) {
      Alert.alert("최대 3개까지만 선택할 수 있어요.")
      return
    }

    if (Emotions.includes(keyword)) {
      Alert.alert("이미 선택한 감정이에요.")
      return
    }

    let temp = [...Emotions]

    temp.push(keyword)
    setEmotions(temp)
  }

  //키워드 제거
  const delEmotion = (keyword) => {
    let temp = [...Emotions]
    setEmotions(temp.filter((i) => i !== keyword))
  }

   //이미지 제거
  const delImg = () => {
    Alert.alert(
      "삭제",
      "이미지를 삭제하시겠습니까?",
      [                           
        {
          text: "네",                              
          onPress: () => setImage(""),    
          style: "cancel"
        },
        { text: "아니오", onPress: () => console.log("안한대") }, 
      ],
      { cancelable: false }
    )
    
  }

  //녹음 제거
  const delAudio = () => {
    Alert.alert(
      "삭제",
      "오디오를 삭제하시겠습니까?",
      [                           
        {
          text: "네",                              
          onPress: () => setAudio(),    
          style: "cancel"
        },
        { text: "아니오", onPress: () => console.log("안한대") }, 
      ],
      { cancelable: false }
    )
    
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
   React.useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      setId(result);
    });
  }, [])

  //서버 요청 로딩
  const [loading, setLoading] = useState(false)

  //저장 버튼 
  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (titleText.length<=0) {
      setShowDescError(true);
      Alert.alert("제목을 입력해 주세요.")
      return
    }

    if (Emotions.length<=0) {
      setShowDescError(true);
      Alert.alert("감정 키워드를 선택해 주세요.")
      return
    }

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
      Alert.alert("내용을 입력해 주세요.")
      return
    }

    if(image != "") {
      // formData.append('multipartFileList' , {uri: localUri, name: filename, type});
      await axios({
        method : 'post',
        url : 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/upload',
        headers:{
          'content-type' : 'multipart/form-data',
        },
        data : send
      })
      .then((res) => {
          // richText.current.insertImage(res.data);
          url = res.data;
          console.log(url);
          
      })
      .catch((err) => {
        console.log(err);
      })
  }

    // 서버 데이터 전송
    setLoading(true)

    try {
      await axios({
        method: "post",
        url: `${API.WRITE}`,
        params: {
          id: id, //****작성자 id
          title: titleText,
          content: descHTML,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          img: url, //****이미지 추가
          voice: audio?.file,
          keyword: Emotions,
        }
      }, null)
        .then(res => {
          console.log("성공", res.data)
          Alert.alert("일기가 저장되었어요.")
          moveNavigate("Home")
        })
        .catch(function (error) {
          console.log(error.response.data)
          Alert.alert("❗error : bad response")
        })
    } catch (error) {
      console.log(error.response.data)
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <SafeAreaView style={styles.titleLayout}>
        <TextInput
          placeholder="제목:"
          placeholderTextColor={"#456185"}
          style={styles.title}
          onChangeText={onChangeTitleText}
          value="{titleFunc}"
          returnKeyType="next"
          maxLength={30}
          editable={false} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
        />
      </SafeAreaView>

      {/* 감정선택 */}
      <SafeAreaView style={styles.feelingLayout}>
        {/* 오늘의 기분 키워드 피커 */}
        <View>
          <Picker
            style={styles.feeling}
            onValueChange={(itemValue) => addEmotion(itemValue)}>
            <Picker.Item enabled={false} label="감정 선택" value="emo" />
            <Picker.Item label="추억" value="추억" />
            <Picker.Item label="추천" value="추천" />
            <Picker.Item label="성취" value="성취" />
            <Picker.Item label="좋음" value="좋음" />
            <Picker.Item label="즐거움" value="즐거움" />
            <Picker.Item label="행복" value="행복" />
            <Picker.Item label="기대" value="기대" />
            <Picker.Item label="감사" value="감사" />
            <Picker.Item label="부러움" value="부러움" />
            <Picker.Item label="당황" value="당황" />
            <Picker.Item label="피곤" value="피곤" />
            <Picker.Item label="안타까움" value="안타까움" />
            <Picker.Item label="슬픔" value="슬픔" />
            <Picker.Item label="실망" value="실망" />
            <Picker.Item label="아픔" value="아픔" />
            <Picker.Item label="불행" value="불행" />
            <Picker.Item label="우울" value="우울" />
          </Picker>
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
              {"dateFunc"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 키보드 닫기 버튼 */}
      <View style={styles.keyboardButtonView}>
        <TouchableOpacity onPress={() => richText.current?.dismissKeyboard()}>

          <MaterialIcons name="keyboard-hide" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* --------------------- 에디터 툴 --------------------- */}
      <RichToolbar
        disabled = {true} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
        disabledIconTint='#555'
        
        // 커스텀 액션
        iconMap={{
          // 음성 녹음 버튼
          ["insertVoice"]: voice,
        }}

        editor={richText}

        // 사진 picker 기능
        onPressAddImage={pickImage}

        // 음성 녹음 기능
        insertVoice={toggleModal}

        selectedIconTint="#ED7C58"
        iconTint="#fff"

        // 액션 툴 추가
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertImage,
          "insertVoice",
          actions.undo,
          actions.redo,
        ]}
        style={styles.richTextToolbarStyle}
      />

      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 0.3, backgroundColor: '#456185', justifyContent: 'center', alignItems: 'center' }}>
          <AudioRecorder getAudio={getAudio} />

          <View style={{ marginTop: '6%' }}>
            {isRecording ?
              <Text style={{ color: 'white' }}>녹음 중입니다.</Text>
              :
              <Button title='닫기' onPress={toggleModal} ></Button>
            }
          </View>
        </View>
      </Modal>

      {/*--------------------- 에디터 --------------------- */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 0.8 }}>
        <SafeAreaView>
          <ScrollView>
            {/* {이미지 보이는 곳} */}
          <Pressable onLongPress={delImg}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Pressable>
            {/* 음성 플레이어 영역 */}
            {audio &&
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <AudioPlayer audio={audio}></AudioPlayer>
                <Button title='삭제'  onPress={delAudio}/>
              </View>
            }

            <RichEditor
              ref={richText} // from useRef()
              onChange={richTextHandle}
              placeholder="소중한 마음을 담아서 일기를 작성해보세요."
              androidHardwareAccelerationDisabled={true}
              editorStyle={{
                backgroundColor: "#071D3A",
                placeholderColor: "#456185",
                color: "white",
              }}
              style={{ ...styles.richTextEditorStyle }}
              initialHeight={SCREEN_HEIGHT / 2}
              disabled={true} // 수정누른 경우 true로 state 바꿔야 텍스트 편집가능 함.
              value="{valueFunc}"
              >
            </RichEditor>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* 수정 버튼 */}
      <View style={styles.saveButtonView}>
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={"modifyBtn"}>
          <Text style={styles.textButtonStyle}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={"deleteBtn"}>
          <Text style={styles.textButtonStyle}>삭제</Text>
        </TouchableOpacity>
      </View>
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
    color: "#456185",
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