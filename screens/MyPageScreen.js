import * as React from 'react';
import { StyleSheet, Dimensions, View, Image,TextInput, SafeAreaView, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function MyPageScreen({ navigation }) {
  return (
    <View style={{ ...styles.container, backgroundColor:"#071D3A" }}>
      {/* 로고 박스 */}
      <View style={{...styles.logoBox}}>
        <Image resizeMode="contain" style={{width:SCREEN_WIDTH/2}}source={require('../assets/images/logo.png')} ></Image>
      </View>

      {/* 입력 레이아웃 */}
      <KeyboardAvoidingView behavior="padding">
      <View style={{...styles.inputLayout}}>
        {/* 아이디 박스 */}
        <TextInput style={{...styles.inputBox}} 
        placeholder="아이디 입력"
        placeholderTextColor={"#999999"}
        />
        {/* 아이디 유효성 검사 */}
        <View style={{...styles.inputCheck}}>
          {/* <Text style={{color:"#32CD99"}}>사용할 수 있는 아이디입니다.</Text> */}
        </View>
        {/* 이메일 박스 */}
        <TextInput style={{...styles.inputBox}} 
        placeholder="이메일 입력"
        placeholderTextColor={"#999999"}
        />
        {/* 이메일 유효성 검사 */}
        <View style={{...styles.inputCheck}}>
          {/* <Text style={{color:"#32CD99"}}>사용할 수 있는 이메일입니다.</Text> */}
        </View>

        {/* 비밀번호 박스 */}
        <TextInput style={{...styles.inputBox}} 
        placeholder="비밀번호 입력"
        placeholderTextColor={"#999999"}
        secureTextEntry
        />
        {/* margin */}
        <View style={{...styles.inputCheck}}>
          
        </View>
        
        {/* 비밀번호 확인 박스 */}
        <TextInput style={{...styles.inputBox}} 
        placeholder="비밀번호 재입력"
        placeholderTextColor={"#999999"}
        secureTextEntry
        />
        {/* 비밀번호 유효성 검사 */}
        <View style={{...styles.inputCheck}}>
          {/* <Text style={{color:"red"}}>비밀번호가 일치하지 않습니다.</Text> */}
        </View>

        {/* 회원가입 버튼 */}
        <TouchableHighlight
        style={{marginTop:24}}

        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert('소담의 일원이 되셨습니당!')}>
        
          <View style={{...styles.joinBtn,backgroundColor:"#32CD99"}}>
            <Text style={{...styles.joinText,color:"white"}}>회원가입</Text>
          </View>
        </TouchableHighlight>
      </View>
      
      </KeyboardAvoidingView>
    </View>
  );
}

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
      flexDirection: 'column',
      width: SCREEN_WIDTH,
      flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  logoBox: {
    height: SCREEN_HEIGHT /20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputLayout:{
    paddingLeft:24,
    paddingRight:24,
  },

  inputBox:{
    padding:18,
    marginBottom:8,
    height: SCREEN_HEIGHT/16,
    backgroundColor: "#F1F1F5",
    width:"100%",
    borderRadius:10,
    border:1,
  },

  inputCheck:{
    marginBottom:8,
  },

  joinBtn:{
    padding:12,
    justifyContent: 'center',
    alignItems: 'center',
    // IOS
    shadowColor: "#32CD99", //그림자색
    shadowOpacity: 0.4,//그림자 투명도
    shadowOffset: { width:3, height: 3 }, //그림자 위치
    // ANDROID
    elevation: 3,
  },

  joinText:{
    fontWeight:"bold",
  },

});