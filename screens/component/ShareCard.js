import * as React from 'react';
import { StyleSheet, Button, View, Text, Dimensions, Animated, Image, Pressable, Alert, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect ,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './../css/globalStyles';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function ShareCard({data}) {
  //테마
  useEffect(() => {
    getTheme()
  }, [])

  const [nowTheme, setNowTheme] = useState({});

  const getTheme = async () => {
    let selectedTheme = await AsyncStorage.getItem('theme');

    if (selectedTheme.includes("dark")) setNowTheme(dark);
    else if (selectedTheme.includes("votanical")) setNowTheme(votanical);
    else if (selectedTheme.includes("town")) setNowTheme(town);
    else if (selectedTheme.includes("classic")) setNowTheme(classic);
    else if (selectedTheme.includes("purple")) setNowTheme(purple);
    else if (selectedTheme.includes("block")) setNowTheme(block);
    else if (selectedTheme.includes("pattern")) setNowTheme(pattern);
    else if (selectedTheme.includes("magazine")) setNowTheme(magazine);
    else if (selectedTheme.includes("winter")) setNowTheme(winter);
  }
  const [newContent,setNewContent] = useState(""); 
  const navigation = useNavigation(); 

  // console.log("data",data.diarykey, data.keyword);

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


    //일기 공유 선택
    const shareDiary = () => {
      Alert.alert(
        "일기를 공유하시겠습니까?",
        "다른 사람들의 일기를 하나 볼 수 있게 됩니다.",
        [                           
          {
            text: "네",                              
            onPress: () => shareDiary2(),    
            style: "cancel"
          },
          { text: "아니오", onPress: () => console.log("안한대") }, 
        ],
        { cancelable: false }
      )
      
    }

    const shareDiary2 = async() => {
      AsyncStorage.setItem("one", 'one');
      console.log("ssssss",data.diarykey);
      await axios({
        method: "post",
        url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/sharePush',
        params: {
          diarykey: data.diarykey,
        }
      }, null)
        .then(res => {
          // console.log(res)
          navigation.navigate('ShareAll',  {share: data})
        })
        .catch(function (error) {
          console.log(err);
        })
  
    }
    
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
  useEffect(() => {
    var firstWork = data.content.replace(/<\/div>/g, '\n');
    firstWork = firstWork.replace(/<div>/g, '\n');
    firstWork = firstWork.replace(/<br>/g, '\n');
    firstWork = firstWork.replace(/&nbsp/g, ' ');
    firstWork = firstWork.replace(/<b style="font-size: 1em;">/g, ' ');
    firstWork = firstWork.replace(/<i>/g, ' ');
    firstWork = firstWork.replace(/<u>/g, ' ');
    firstWork = firstWork.replace(/<strike>/g, ' ');
    firstWork = firstWork.replace(/<\/b>/g, ' ');
    firstWork = firstWork.replace(/<\/i>/g, ' ');
    firstWork = firstWork.replace(/<\/u>/g, ' ');
    firstWork = firstWork.replace(/<\/strike>/g, ' ');


    setNewContent(firstWork);
  })


  return (
    <View >
      <Pressable style={{...styles.container}} 
        // 카드 뒤집기
        onPress={() => !!flipRotation ? flipToBack() : flipToFront()}
        // 상세화면
        onLongPress={shareDiary}>

        {/* 앞면 */}
        <Animated.View
          style={{ ...styles.front, backgroundColor: nowTheme.front, borderColor: nowTheme.cardBorder, ...flipToFrontStyle, }}>
        <ImageBackground style={{ backgroundColor: nowTheme.front,height: (SCREEN_WIDTH / 1.8) * 1.59  }} source={nowTheme.image} resizeMode={'cover'}>
          {/* 키워드 */}
          <View style={{ ...styles.frontKeyWordBox }}>
            <Text style={{ color: nowTheme.font, fontSize: SCREEN_WIDTH / 20 }}>{data.day}일</Text>
            <Text style={{ color: nowTheme.font, fontSize: SCREEN_WIDTH / 20 }}>#{data.emotion}</Text>
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
            {nowTheme.icon}
          </View>
          {/* 제목  */}
          <View style={{ ...styles.frontTitle }}>
            <Text numberOfLines={1}
              ellipsizeMode="tail" style={{ color: nowTheme.font, fontWeight: "bold", fontSize: SCREEN_WIDTH / 14 }}>{data.title}</Text>
          </View>
        </ImageBackground>
        </Animated.View>

        {/* 뒷면 */}
        <Animated.View
          style={{ ...styles.back, backgroundColor: nowTheme.back, borderColor: nowTheme.cardBorder, ...flipToBackStyle }}>
          {/* 대표 이미지 */}
          <View style={{ ...styles.backImageBox }}>
            {(data.img !== null && data.img !== "") ?
              <Image source={{ uri: data.img }} style={styles.imageSize} resizeMode={'stretch'}></Image> :
              <Image source={ nowTheme.logo } style={styles.imageSize} resizeMode={'stretch'}></Image>
            }
          </View>
          {/* 내용 */}
          <View style={{...styles.backTextView, borderColor: nowTheme.cardBorder,}}>
            <Text style={{...styles.backText, color:nowTheme.font}}
              numberOfLines={7}
              ellipsizeMode="tail"
            >
              {/* {props.data.content} */}
              {newContent}
            </Text>
          </View>
          {/* 녹음 아이콘 */}
          {
            data.voice === null ?
              null
              :
              <View style={styles.backVoiceView}>
                <MaterialIcons name="keyboard-voice" size={24} color={nowTheme.font} />
              </View>
          }

        </Animated.View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontSize: '3%',
    height: (SCREEN_WIDTH / 1.8) * 1.86,
    alignItems: "center",
    justifyContent: "center",
    
  },

  front: {
    width: SCREEN_WIDTH / 1.8,
    height: (SCREEN_WIDTH / 1.8) * 1.6,
    backgroundColor: "#152F5E",
    marginRight: 16,
    marginLeft: 16,
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
    // 
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
    marginLeft:10,
    minHeight: "20%",
    flexDirection: "row"
  
  },

  frontIcon: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50%",  
  },

  frontTitle: {
    minHeight: "20%",
    alignItems: "center",
    justifyContent:"center"
  
  },

  back: {
    width: SCREEN_WIDTH / 1.8,
    height: (SCREEN_WIDTH / 1.8) * 1.6,
    backgroundColor: "#274180",
    marginRight: 16,
    marginLeft: 16,
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

  backTitle: {
    minHeight: "20%",
  },

  backText: {
    color: "white",
  },

  backImageBox: {
    margin: 8,
    minHeight: "30%",
    width: "90%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  imageSize: {
    alignItems: "center",
    justifyContent: "center",
    width: '95%',
    height: "93%",
    borderRadius: 10,
  
  },

  backTextView: {
    margin: 6,
    alignItems: "center",
    width: "90%",
    borderTopWidth: 1,
    borderColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },

  backVoiceView: {
    alignItems: "flex-end",
    justifyContent: "center",
    minHeight: "10%",
  },

})
export default ShareCard;