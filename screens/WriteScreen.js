import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, RichText, Alert } from 'react-native';
import { actions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Chip } from 'react-native-paper';
import Modal from "react-native-modal";
import AudioRecorder from './component/AudioRecorder';
import AudioPlayer from './component/AudioPlayer';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function WriteScreen({ navigation }) {
  const voice = require("../assets/images/voice.png");
  const [titleText, onChangeTitleText] = useState("");
  const [feelingText, onChangeFeelingText] = useState("");
  const [dateText, onChangeDateText] = useState("");
  const richText = React.useRef();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  //Modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //감정 Picker
  const [Emotions, setEmotions] = useState([]);

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

  //Date Time Picker
  const [date, setDate] = useState(new Date());

  // 민제 형이 할 것. (사진 피커)
  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
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

  //저장 버튼 
  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    console.log("replaceHTML : ", replaceHTML)
    console.log("replaceWhiteSpace", replaceWhiteSpace)

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      console.log("저장해욧")
      console.log("titleText : " + titleText, "feelingText : " + feelingText, "dateText : " + dateText, "감정 :" +Emotions)
      // send data to your server! 여기에 어싱크 스토리지
    }
  };

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <SafeAreaView style={styles.titleLayout}>
        <TextInput
          autoFocus
          placeholder="제목:"
          placeholderTextColor={"#456185"}
          style={styles.title}
          onChangeText={onChangeTitleText}
          value={titleText}
          returnKeyType="next"
          maxLength={30}
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
                  {emo}
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
              {date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일'}
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

        // 커스텀 액션
        iconMap={{
          // 음성 녹음 버튼
          ["insertVoice"]: voice,
        }}

        editor={richText}

        // 사진 picker 기능
        onPressAddImage={onPressAddImage}

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
        <View style={{ flex: 0.3, backgroundColor: '#456185', justifyContent: 'center', alignItems: 'center'}}>
          <AudioRecorder getAudio={getAudio}/>

          <View style={{ marginTop: '6%' }}>
            {isRecording ?
              <Text style={{color:'white'}}>녹음 중입니다.</Text>
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
            {/* 음성 플레이어 영역 */}
            { audio &&
              <View style={{ justifyContent:'center', alignItems:'center'}}>
                <AudioPlayer audio={audio}></AudioPlayer>
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
              initialHeight={SCREEN_HEIGHT / 2}>

            </RichEditor>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* 저장 버튼 */}
      <View style={styles.saveButtonView}>

        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={submitContentHandle}>
          <Text style={styles.textButtonStyle}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WriteScreen;

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
    justifyContent: "center",
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

  modalView:{
    flex: 0.3, 
    backgroundColor: '#456185', 
    justifyContent:'center', 
    alignItems:'center'
  },
});