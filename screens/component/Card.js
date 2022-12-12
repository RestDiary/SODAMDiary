import * as React from 'react';
import { StyleSheet, Button, View, Text, Dimensions, Animated, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect ,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function Card({data}) {
  const [newContent,setNewContent] = useState(""); 
  const navigation = useNavigation(); 

  //링크 이동
  const moveNavigate = (screen) => {
    navigation.navigate(screen)
  }

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

  //html 태그 지우는 공장 <><><><><>
  useEffect(() =>{
    var firstWork = data.content.replace(/<\/div>/g, '\n');
    firstWork = firstWork.replace(/<div>/g, '\n');
    firstWork = firstWork.replace(/<br>/g, '\n');
    firstWork = firstWork.replace(/&nbsp/g, ' ');
    setNewContent(firstWork);
  })


  return (
    <View >
      <Pressable style={{...styles.container}} 
        // 카드 뒤집기
        onPress={() => !!flipRotation ? flipToBack() : flipToFront()}
        // 상세화면
        onLongPress={() => navigation.navigate('Detail',  {card: data})}>

        {/* 앞면 */}
        <Animated.View
          style={{ ...styles.front, ...flipToFrontStyle,  }}>
          {/* 키워드 */}
          <View style={{ ...styles.frontKeyWordBox }}>
            <Text>{data.keyword}</Text>
            {/* {
              props.data.keyword.map(function(id,index){
                return(
                <Text style={{color: "#ED7C58"}}>
                {props.data.keyword[index]}
              </Text>
              )
              })
            } */}
          </View>
          {/* 아이콘  (아이콘은 테마마다 사용하는 아이콘이 다르다)*/} 
          <View style={{ ...styles.frontIcon }}>
            <Entypo name="moon" size={36} color="white" />
            </View>
            {/* 제목  */}
            <View style={{...styles.frontTitle}}>
              <Text style={{color: "white", fontWeight:"bold", fontSize:SCREEN_WIDTH/20}}>{data.title}</Text>
            </View>
        </Animated.View>

        {/* 뒷면 */}
        <Animated.View
          style={{ ...styles.back, ...flipToBackStyle }}>
          {/* 대표 이미지 */}
          <View style={{...styles.backImageBox}}>
            <Image source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQfvaxDliUnxIm0pwpprZSMszh_UVFNfjmtQ&usqp=CAU"}} style={styles.imageSize} resizeMode={'contain'}></Image>
          </View>
          {/* 내용 */}
          <View style={styles.backTextView}>
            <Text style={styles.backText}
            numberOfLines={7}
            ellipsizeMode="tail"
            >
              {/* {props.data.content} */}
              {newContent}
            </Text>
          </View>
          {/* 녹음 아이콘 */}
          {
            data.voice ===null ? 
              null
            : 
            <View style={styles.backVoiceView}>
              <MaterialIcons name="keyboard-voice" size={24} color="white" />
            </View>
          }

        </Animated.View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontSize:'3%',
    height:(SCREEN_WIDTH/2)*1.86,
    alignItems: "center",
    justifyContent:"center",
    
  },
  
  front: {
    width: SCREEN_WIDTH / 2,
    height: (SCREEN_WIDTH/2)*1.6,
    backgroundColor: "#152F5E",
    marginRight: 16,
    position: "absolute",
    backfaceVisibility: "hidden",
    borderWidth: 1,
    borderColor: "#555",
    //IOS
    shadowColor: "#000", //그림자색
    // shadowOpacity: 0.3,//그림자 투명도
    shadowOffset: { width: 2, height: 2 }, //그림자 위치
    // ANDROID
    elevation: 3,
  },

  frontKeyWordBox: {
    alignItems: "flex-end",
    justifyContent:"flex-start",
    marginTop:5,
    marginRight:5,
    minHeight:"20%",
  },

  frontIcon: {
    alignItems: "center",
    justifyContent:"center",
    minHeight:"50%",
  },

  frontTitle: {
    minHeight:"20%",
    alignItems: "center",
    
  },

  back: {
    width: SCREEN_WIDTH / 2,
    height: (SCREEN_WIDTH/2)*1.6,
    backgroundColor: "#274180",
    marginRight: 30,
    alignItems: 'center',
    position: "relative",
    backfaceVisibility: "hidden",
    borderWidth: 1,
    borderColor: "#555", 
    //IOS
    shadowColor: "#000", //그림자색
    // shadowOpacity: 0.3,//그림자 투명도
    shadowOffset: { width: 2, height: 2 }, //그림자 위치
    // ANDROID
    elevation: 3,
  },

  backText: {
    color: "white",

  },

  backImageBox: {
    margin: 4,
    minHeight:"30%",
    width:"90%",
    height:"40%",
    alignItems: "center",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "white",
  },
  imageSize:{
    alignItems: "center",
    justifyContent:"center",
    width:'100%',
    height:"100%",

  },

  backTextView: {
    margin: 6,
    alignItems: "center",
    justifyContent:"flex-start",
    minHeight:"50%",
  },

  backVoiceView:{
    alignItems: "flex-end",
    justifyContent:"center",
    minHeight:"10%",
  },

})
export default Card;