import * as React from 'react';
import { StyleSheet, Dimensions, View, Image, TextInput, SafeAreaView, Text, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function SettingScreen({ navigation }) {
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

   //링크 이동
   const moveNavigate = (screen) => {
    navigation.navigate(screen)
}

  const login = () => {
    console.log("로그인 하러 옴");
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/login", null, {
        params: {
          id: id,
          pw: pw,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data === 0) {
          // 받아온 값이 0이라면

          // alert("로그인에 성공하셨습니다.");
          AsyncStorage.setItem('id',id);
          AsyncStorage.getItem('id', (err, result) => {
            console.log(result); // User1 출력
          });
          navigation.replace('Home')
        } else {
          // 1이라면 실패
          alert("로그인에 실패하셨습니다.");
        }

        return res;
      })
      .then((res) => {
        if (email === "") {
          alert("이메일을 입력해주세요.");
          return;
        } else if (pw === "") {
          alert("비밀번호를 입력해주세요.");
          return;
        }

        //console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: "#071D3A" }}>
      {/* 로고 박스 */}
      <View style={{ ...styles.logoBox }}>
        <Image resizeMode="contain" style={{ width: SCREEN_WIDTH / 2 }} source={require('../assets/images/logo.png')} ></Image>
      </View>

      {/* 입력 레이아웃 */}
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ ...styles.inputLayout }}>
          {/* 아이디 박스 */}
          <TextInput style={{ ...styles.inputBox }}
            placeholder="아이디 입력"
            placeholderTextColor={"#999999"}
            onChangeText={text => setId(text)}
          />

          {/* margin */}
          <View style={{ ...styles.inputCheck }}>

          </View>

          {/* 비밀번호 박스 */}
          <TextInput style={{ ...styles.inputBox }}
            placeholder="비밀번호 입력"
            placeholderTextColor={"#999999"}
            secureTextEntry
            onChangeText={text => setPw(text)}
          />
          {/* 비밀번호 유효성 검사 */}
          <View style={{ ...styles.inputCheck }}>
            {/* <Text style={{color:"red"}}>아이디 또는 비밀번호가 일치하지 않습니다.</Text> */}
          </View>

          {/* 로그인 버튼 */}
          <TouchableHighlight
            style={{ marginTop: 24 }}

            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={login}>

            <View style={{ ...styles.loginBtn, backgroundColor: "#32CD99" }}>
              <Text style={{ ...styles.loginText, color: "white" }}>로그인</Text>
            </View>
          </TouchableHighlight>

          <View style={{ ...styles.loginMenu }}>
            <TouchableOpacity onPress={(screen) => moveNavigate('FindPw')}>
              <View>
                <Text style={{ color: "#fff", fontSize:16 }}>비밀번호 찾기 | </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => moveNavigate('MyPage')}>
              <View>
                <Text style={{ color: "#fff", fontSize:16 }}>회원가입</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: SCREEN_WIDTH,
  },

  logoBox: {
    height: SCREEN_HEIGHT / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputLayout: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  inputBox: {
    paddingLeft: 18,
    marginBottom: 8,
    height: SCREEN_HEIGHT / 16,
    backgroundColor: "#F1F1F5",
    width: "100%",
    borderRadius: 10,
    border: 1,
  },

  inputCheck: {
    marginBottom: 8,
  },

  loginBtn: {
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // IOS
    shadowColor: "#32CD99", //그림자색
    shadowOpacity: 0.4,//그림자 투명도
    shadowOffset: { width: 3, height: 3 }, //그림자 위치
    // ANDROID
    elevation: 3,
  },

  loginText: {
    fontWeight: "bold",
  },

  loginMenu: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },

});