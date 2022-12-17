import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  RichText,
  Alert,
  Image,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Chip } from "react-native-paper";
import { API } from "../config.js";
import Modal from "react-native-modal";
import AudioRecorder from "./component/AudioRecorder";
import * as ImagePicker from "expo-image-picker";
import AudioPlayer from "./component/AudioPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable.js";
import {
  dark,
  votanical,
  town,
  classic,
  purple,
  block,
  pattern,
  magazine,
  winter,
} from "./css/globalStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function WriteScreen({ navigation }) {
  //스크린 이동할 때 lifecycle 실행
  const isFocused = useIsFocused();
  //테마
  useEffect(() => {
    getTheme();
  }, [isFocused]);

  const [nowTheme, setNowTheme] = useState({});
  const [editorColor, setEditorColor] = useState({});

  //테마, 에디터 컬러 가져오기
  const getTheme = async () => {
    let selectedTheme = await AsyncStorage.getItem("theme");
    let editorOption = {};

    if (selectedTheme.includes("dark")) {
      setNowTheme(dark);
      editorOption = {
        backgroundColor: dark.cardBg,
        placeholderColor: "#456185",
        color: dark.font,
      };
    } else if (selectedTheme.includes("votanical")) {
      setNowTheme(votanical);
      editorOption = {
        backgroundColor: votanical.cardBg,
        placeholderColor: "#456185",
        color: votanical.font,
      };
    } else if (selectedTheme.includes("town")) {
      setNowTheme(town);
      editorOption = {
        backgroundColor: town.cardBg,
        placeholderColor: "#456185",
        color: town.font,
      };
    } else if (selectedTheme.includes("classic")) {
      setNowTheme(classic);
      editorOption = {
        backgroundColor: classic.cardBg,
        placeholderColor: "#456185",
        color: classic.font,
      };
    } else if (selectedTheme.includes("purple")) {
      setNowTheme(purple);
      editorOption = {
        backgroundColor: purple.cardBg,
        placeholderColor: "#456185",
        color: purple.font,
      };
    } else if (selectedTheme.includes("block")) {
      setNowTheme(block);
      editorOption = {
        backgroundColor: block.cardBg,
        placeholderColor: "#456185",
        color: block.font,
      };
    } else if (selectedTheme.includes("pattern")) {
      setNowTheme(pattern);
      editorOption = {
        backgroundColor: pattern.cardBg,
        placeholderColor: "#456185",
        color: pattern.font,
      };
    } else if (selectedTheme.includes("magazine")) {
      setNowTheme(magazine);
      editorOption = {
        backgroundColor: magazine.cardBg,
        placeholderColor: "#456185",
        color: magazine.font,
      };
    } else if (selectedTheme.includes("winter")) {
      setNowTheme(winter);
      editorOption = {
        backgroundColor: winter.cardBg,
        placeholderColor: "#456185",
        color: winter.font,
      };
    } else {
      setNowTheme(dark);
      editorOption = {
        backgroundColor: dark.cardBg,
        placeholderColor: "#456185",
        color: dark.font,
      };
    }

    setEditorColor(editorOption);
  };

  const voice = require("../assets/images/voice.png");
  const [titleText, onChangeTitleText] = useState("");
  const [feelingText, onChangeFeelingText] = useState("");
  const richText = useRef();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Emotions, setEmotions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [id, setId] = useState("");

  //이미지 업로드용
  const [image, setImage] = useState();
  const [send, setSend] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const formData = new FormData();
  let url = ""; //서버에서 받아올 aws이미지 경로

  //날짜 선택 보일지 여부 선택
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());

    hideDatePicker();
  };

  //내 갤러리에서 사진 선택
  const pickImage = async () => {
    if (!status.granted) {
      // status로 권한이 있는지 확인
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    setImage(result.assets[0].uri);

    const localUri = result.assets[0].uri;

    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    // const formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });
    setSend(formData);
    console.log(formData);
    console.log(localUri);
    console.log(filename);
    console.log(type);
  };

  //링크이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen);
  };

  //Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //감정 키워드 추가
  const addEmotion = (keyword) => {
    if (Emotions.length >= 3) {
      Alert.alert("최대 3개까지만 선택할 수 있어요.");
      return;
    }

    if (Emotions.includes(keyword)) {
      Alert.alert("이미 선택한 감정이에요.");
      return;
    }

    let temp = [...Emotions];

    temp.push(keyword);
    setEmotions(temp);
  };

  //키워드 제거
  const delEmotion = (keyword) => {
    let temp = [...Emotions];
    setEmotions(temp.filter((i) => i !== keyword));
  };

  //이미지 제거
  const delImg = () => {
    Alert.alert(
      "삭제",
      "이미지를 삭제하시겠습니까?",
      [
        {
          text: "네",
          onPress: () => setImage(""),
          style: "cancel",
        },
        { text: "아니오", onPress: () => console.log("안한대") },
      ],
      { cancelable: false }
    );
  };

  //녹음 제거
  const delAudio = () => {
    Alert.alert(
      "삭제",
      "오디오를 삭제하시겠습니까?",
      [
        {
          text: "네",
          onPress: () => setAudio(),
          style: "cancel",
        },
        { text: "아니오", onPress: () => console.log("안한대") },
      ],
      { cancelable: false }
    );
  };

  //자식에서 부모에게 Audio 데이터 전달
  const [audio, setAudio] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const getAudio = (audio, isRecording) => {
    setAudio(audio);
    setIsRecording(isRecording);
  };

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
    AsyncStorage.getItem("id", (err, result) => {
      setId(result);
    });
  }, []);

  //서버 요청 로딩
  const [loading, setLoading] = useState(false);

  //저장 버튼
  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
    let score;

    if (titleText.length <= 0) {
      setShowDescError(true);
      Alert.alert("제목을 입력해 주세요.");
      return;
    }

    if (Emotions.length <= 0) {
      setShowDescError(true);
      Alert.alert("감정 키워드를 선택해 주세요.");
      return;
    }

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
      Alert.alert("내용을 입력해 주세요.");
      return;
    }

    if (image != "") {
      // formData.append('multipartFileList' , {uri: localUri, name: filename, type});
      await axios({
        method: "post",
        url: "http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/upload",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: send,
      })
        .then((res) => {
          // richText.current.insertImage(res.data);
          url = res.data;
          console.log(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // 서버 데이터 전송
    setLoading(true);
    try {
      await axios(
        {
          method: "post",
          url: `${API.WRITE}`,
          params: {
            id: id, //****작성자 id
            title: titleText,
            content: descHTML,
            year: year,
            month: month,
            day: day,
            img: url, //****이미지 추가
            voice: audio?.file,
            keyword: Emotions,
          },
        },
        null
      )
        .then((res) => {
          console.log("성공", res.data);
          Alert.alert("일기가 저장되었어요.");
          moveNavigate("Home");
        })
        .catch(function (error) {
          console.log(error.response.data);
          Alert.alert("❗error : bad response");
        });
    } catch (error) {
      console.log(error.response.data);
    }

    setLoading(false);
  };

  return (

    
    <View style={{ ...styles.container, backgroundColor: nowTheme.cardBg }}>
      
      {/* 제목 */}
      <SafeAreaView style={styles.titleLayout}>
        <TextInput
          autoFocus
          placeholder="제목"
          placeholderTextColor={"#456185"}
          style={{ ...styles.title, color: nowTheme.font, fontWeight: "bold" }}
          onChangeText={onChangeTitleText}
          value={titleText}
          returnKeyType="next"
          maxLength={30}
        />
      </SafeAreaView>

      {/* 감정선택 */}
      <SafeAreaView style={{...styles.feelingLayout, justifyContent:"space-between"}}>
        {/* 오늘의 기분 키워드 피커 */}
        <View>
          <Picker
            style={{
              ...styles.feeling,
              backgroundColor: nowTheme.btn,
              color: nowTheme.font,
              justifyContent:"space-between"

            }}
            onValueChange={(itemValue) => addEmotion(itemValue)}
          >
            <Picker.Item style={{backgroundColor: nowTheme.btn, color: nowTheme.font}} enabled={false} label="감정 선택" value="emo" />
            <Picker.Item label="추억" value="추억" />
            <Picker.Item label="추천" value="추천" />
            <Picker.Item label="성취" value="성취" />
            <Picker.Item label="좋음" value="좋음" />
            <Picker.Item label="즐거움" value="즐거움" />
            <Picker.Item label="행복" value="행복" />
            <Picker.Item label="화남" value="화남" />
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
        <View style={{ ...styles.feelingBtnBox, color: nowTheme.font }}>
          {Emotions &&
            Emotions.map((emo, index) => {
              return (
                <Chip
                  key={index}
                  compact="true"
                  onClose={(keyword) => delEmotion(emo)}
                >
                  {emo}
                </Chip>
              );
            })}
        </View>
      </SafeAreaView>

      {/* 날짜 */}
      <SafeAreaView style={styles.extendLayout}>
        <View style={styles.dateLayout}>
          <TouchableOpacity onPress={showDatePicker}>

            <Text style={{ ...styles.date, color: nowTheme.font }}>
              {year +
                "년 " +
                month +
                "월 " +
                day +
                "일"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={date}
            />

      {/* 키보드 닫기 버튼 */}
      <View style={styles.keyboardButtonView}>
        <TouchableOpacity onPress={() => richText.current?.dismissKeyboard()}>
          <MaterialIcons name="keyboard-hide" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* --------------------- 에디터 툴 --------------------- */}

      {editorColor.backgroundColor && (
        <>
          <RichToolbar
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
            style={{
              ...styles.richTextToolbarStyle,
              backgroundColor: nowTheme.btn,
            }}
          />

          {/* Modal */}
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                flex: 0.4,
                backgroundColor: nowTheme.cardBg,
                justifyContent: "center",
                alignItems: "center",
                borderRadius:20,
              }}
            >
              <AudioRecorder getAudio={getAudio} />

              <View style={{ marginTop: "6%" }}>
                {isRecording ? (
                  <Text style={{...styles.textButtonStyle, color:nowTheme.font }}>녹음 중입니다.</Text>
                ) : (
                  <TouchableOpacity style={{backgroundColor:nowTheme.btn, padding:10, borderRadius:10}} onPress={toggleModal}>
                    <Text style={{...styles.textButtonStyle,}}>
                      닫기
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>

          {/*--------------------- 에디터 --------------------- */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 0.9 }}
          >
            <SafeAreaView>
              <ScrollView>
                {/* 음성 플레이어 영역 */}
                {audio && (
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      
                    }}
                  >
                    <Pressable onLongPress={delAudio}>
                    <AudioPlayer audio={audio}></AudioPlayer>
                    </Pressable>

                  </View>
                )}
                {/* {이미지 보이는 곳} */}
                <Pressable onLongPress={delImg}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: SCREEN_WIDTH/1.5, height: SCREEN_WIDTH/1.5, borderWidth:1, borderColor:nowTheme.cardBorder, margin:10, borderRadius:20, }}
                    />
                  )}
                </Pressable>

                <RichEditor
                  ref={richText} // from useRef()
                  onChange={richTextHandle}
                  placeholder="소중한 마음을 담아서 일기를 작성해보세요."
                  androidHardwareAccelerationDisabled={true}
                  editorStyle={editorColor}
                  style={{ ...styles.richTextEditorStyle }}
                  initialHeight={SCREEN_HEIGHT / 2}
                ></RichEditor>
              </ScrollView>
            </SafeAreaView>
          </KeyboardAvoidingView>

          {/* 저장 버튼 */}
          <View style={styles.saveButtonView}>
            <TouchableOpacity
              style={{
                ...styles.saveButtonStyle,
                backgroundColor: nowTheme.btn,
              }}
              onPress={submitContentHandle}
            >
              <Text style={styles.textButtonStyle}>저장</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    marginBottom: 8,
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
    shadowColor: "#000",
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
    backgroundColor: "#071D3A",
    flex: 1,
  },

  title: {
    color: "white",
    fontSize: SCREEN_HEIGHT / 35,
    height: SCREEN_HEIGHT / 16,
    marginLeft: 10,
  },

  titleLayout: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 20,
  },

  extendLayout: {
    flexDirection: "row",
  },

  feelingLayout: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 2,
    flexDirection: "row",
  },

  feeling: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 50,
    color: "#456185",
    padding: 10,
  },

  feelingBtnBox: {
    flexDirection: "row",
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 14.5,
    color: "#456185",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
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
    backgroundColor: "#456185",
    justifyContent: "center",
    alignItems: "center",
  },
});
