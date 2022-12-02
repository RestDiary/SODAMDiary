import * as React from 'react';
import { StyleSheet, Dimensions, View, Image, TextInput, SafeAreaView, Text, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function SettingScreen({ navigation }) {
  return (
    <View style={{ ...styles.container, backgroundColor: "#071D3A" }}>
      {/* 로고 박스 */}
      <View style={{ ...styles.logoBox }}>
        <Image resizeMode="contain" style={{ width: SCREEN_WIDTH / 2 }} source={require('../assets/images/logo.png')} ></Image>
      </View>

      {/* 입력 레이아웃 */}
      <KeyboardAvoidingView behavior="padding">
        <View style={{ ...styles.inputLayout }}>
          {/* 아이디 박스 */}
          <TextInput style={{ ...styles.inputBox }}
            placeholder="아이디 입력"
            placeholderTextColor={"#999999"}
          />

          {/* margin */}
          <View style={{ ...styles.inputCheck }}>

          </View>

          {/* 비밀번호 박스 */}
          <TextInput style={{ ...styles.inputBox }}
            placeholder="비밀번호 입력"
            placeholderTextColor={"#999999"}
            secureTextEntry
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
            onPress={() => alert('반가웡')}>

            <View style={{ ...styles.loginBtn, backgroundColor: "#32CD99" }}>
              <Text style={{ ...styles.loginText, color: "white" }}>로그인</Text>
            </View>
          </TouchableHighlight>

          <View style={{ ...styles.loginMenu }}>
            <TouchableOpacity>
              <View>
                <Text style={{ color: "#fff", fontSize:16 }}>비밀번호 찾기 | </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
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
    padding: 18,
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
    padding: 12,
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