import * as React from 'react';
import {StyleSheet, Button, View, Text, Dimensions ,Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const { width: SCREEN_WIDTH ,height:SCREEN_HEIGHT} = Dimensions.get('window');

function Card( props ){


    
  // 리렌더링 시 값이 초기화 되는 것을 막기 위해 ref 사용.
  const flipAnimation = React.useRef(new Animated.Value(0)).current;
  // 초깃 값 초기화
  let flipRotation = 0;
  // 뒤에서 앞으로 다시 뒤집기위해 값 초기화
  flipAnimation.addListener(({ value }) => flipRotation = value);

  // 앞면 초깃값
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          // Y축 측정 값
          inputRange: [0, 180],
          // Y축 범위값
          outputRange: ["0deg", "180deg"]
        })
      }
    ]
  };

  // 뒷면 초깃값
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          // Y축 측정 값
          inputRange: [0, 180],
          // Y축 범위값
          outputRange: ["180deg", "360deg"]
        })
      }
    ]
  };

  // 앞면 애니메이션
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      // Y축 변경 값
      toValue: 180,
      // 딜레이 ms값
      duration: 500,
      // 부드러운 움직임 향상 => (브릿지를 거치지 않고 네이티브에서 애니메이션을 수행)
      useNativeDriver: true,
    }).start();
  };

  // 뒷면 애니메이션
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      // Y축 변경 값
      toValue: 0,
      // 딜레이 ms값
      duration: 500,
      // 부드러운 움직임 향상 => (브릿지를 거치지 않고 네이티브에서 애니메이션을 수행)
      useNativeDriver: true,
    }).start();
  };

    return(
        <>
                <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>
                     {/* 앞면 */}
                     <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-happy" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                     {/* 뒷면 */}
                     <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>부동산 침체기가 본격화되면서 서울지역 아파트들이 ‘10억원 클럽’에서 줄줄이 밀려나고 있다. 기준금리 인상 부담과 거래절벽 현상 심화로 간간이 거래되는 급매물이 시세를 끌어내리는 모습이다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#152F5E',
        width:SCREEN_WIDTH/3,
        height:SCREEN_HEIGHT/3,
    },
    front:{
        width: SCREEN_WIDTH / 3,
        height: SCREEN_HEIGHT / 3.3,
        backgroundColor: "#152F5E",
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        backfaceVisibility: "hidden",
        //IOS
        shadowColor: "#ffffff", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
        //ANDROID
        elevation: 3,
    },
    back: {
        width: SCREEN_WIDTH / 3,
        height: SCREEN_HEIGHT / 3,
        backgroundColor: "#274180",
        marginRight: 16,
        alignItems: 'center',
        justifyContent:"center",
        position: "relative",
        backfaceVisibility: "hidden",
        //IOS
        shadowColor: "#ffffff", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
        //ANDROID
        elevation: 3,
      },
      backText:{
        color:"white",
      },
    
      backTextView:{
        height:"55%",
      },
    
})
export default Card;