import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, RichText } from 'react-native';
import { actions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { MaterialIcons } from '@expo/vector-icons';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function WriteScreen({ navigation }) {
  const voice = require("../assets/images/voice.png");
  const [titleText, onChangeTitleText] = React.useState("");
  const [feelingText, onChangeFeelingText] = React.useState("");
  const [dateText, onChangeDateText] = React.useState("");
  const richText = React.useRef();
  const [descHTML, setDescHTML] = React.useState("");
  const [showDescError, setShowDescError] = React.useState(false);

  // 현기가 할 것. (음성 녹음)
  function insertVoice() {
    // you can easily add videos from your gallery
    RichText.current?.insertVoice(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }

  // 민제 형이 할 것. (사진 피커)
  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
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

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    console.log(replaceHTML)
    console.log(replaceWhiteSpace)

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
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
        />
      </SafeAreaView>

      {/* 날짜 */}
      <SafeAreaView style={styles.extendLayout}>
        <View style={styles.dateLayout}>
          <TextInput
            placeholder="날짜선택:"
            placeholderTextColor={"#456185"}
            style={styles.date}
            onChangeText={onChangeDateText}
            value={dateText}
          ></TextInput>
        </View>

        {/* 오늘의 기분 */}
        <View style={styles.feelingLayout}>
          <TextInput
            placeholder="기분:"
            placeholderTextColor={"#456185"}
            style={styles.feeling}
            onChangeText={onChangeFeelingText}
            value={feelingText}
          ></TextInput>
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
        insertVoice={insertVoice}

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

      {/*--------------------- 에디터 --------------------- */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:0.8}}>
        <SafeAreaView>
          <ScrollView>
            {/* 음성 플레이어 영역 */}
            <View style={{ backgroundColor: 'red' }}>
              <View style={{ height: 40, backgroundColor: 'blue' }}>
                <Text>
                  ㅎㅇ
                </Text>
              </View>
              <View style={{ height: 40, backgroundColor: 'blue' }}>
                <Text>
                  ㅎㅇ
                </Text>
              </View>
              <View style={{ height: 40, backgroundColor: 'blue' }}>
                <Text>
                  ㅎㅇ
                </Text>
              </View>
              <View style={{ height: 40, backgroundColor: 'blue' }}>
                <Text>
                  ㅎㅇ
                </Text>
              </View>
            </View>

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
              style={{ ...styles.richTextEditorStyle}}
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
    padding: 10,
  },

  titleLayout: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 20,
  },

  feeling: {
    color: "white",
    padding: 10,
  },

  extendLayout: {
    flexDirection: 'row',
  },

  feelingLayout: {
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 2,
  },

  date: {
    color: "white",
    padding: 10,
  },

  dateLayout: {
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 2,
  },

  contents: {
    padding: 10,
    flexShrink: 1,
    color: "white",
  },

});