import React from 'react';

import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


function DiaryScreen({ navigation }) {
  
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

return (

  <View style={styles.container}>
    <SafeAreaView>
      {/* 세로 스크롤 뷰 */}
      <ScrollView>
        {/* 년도 */}
        <View style={styles.year}>
        {/*----------------------------<year>------------------------------  */}
          {/* 년 선택하는 것으로 변경예정 */}
          <Text style={styles.yearText}>2022</Text>
        </View>

        {/* 달 */}
        <View style={styles.moon}>
          {/*----------------------------<moon>------------------------------  */}
          <Text style={styles.moonText}>12월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >
                  {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
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
                {/*----------------------------</day>-------------------------------  */}

                {/*----------------------------<day>--------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-neutral" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>23일 국토교통부 실거래가공개시스템에 따르면 서울 강동구 고덕동 ‘고덕그라시움’ 전용면적 73㎡는 지난 7일 9억원에 손바뀜됐다. 최고가(16억6000만원)의 반 토막 수준이다. 직전가(11억8500만원)와 비교해도 3억원 가까이 낮다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-sad" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>공인중개사를 거치지 않은 직거래라 특수관계인 간 명의이전이 의심됐지만, 행정구를 대표하는 대장주의 거래가격이 공시가격을 밑돌게 되면서 매매시장에 충격을 안겼다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>11월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
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
                        <Text style={styles.backText}>인근의 역세권 아파트인 ‘고덕센트럴푸르지오’ 전용 59㎡는 지난 20일 8억2000만원에 팔렸다. 최고가(12억2000만원) 대비 4억원 떨어졌다. 상일동 ‘고덕롯데캐슬베네루체’ 전용 59㎡는 지난달 9억5000만원에 새로운 집주인을 맞았다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-neutral" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>동대문구 휘경동 ‘휘경SK뷰’ 전용 59㎡도 지난 5일 9억2000만원에 계약서를 썼다. 최고가(11억5000만원)에서 2억3000만원 하락했다. 답십리동 ‘래미안미드카운티’ 전용 59㎡ 역시 지난달 9억8000만원에 팔렸다. 최고가(12억8500만원)와 비교해 3억500만원 빠졌다.</Text>
                      </View>  
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-sad" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>성북구 장위동 ‘래미안장위퍼스트하이’ 전용 59㎡는 지난달 7억7000만원까지 주저앉았다. 지난 2월(10억원) 이후 반등하지 못하고 있다. 인근의 ‘래미안장위포레카운티’ 전용 84㎡도 지난달 발생한 3건의 거래가 모두 9억원대에 이뤄졌다. 직전가(11억5000만원)를 2억원씩 하회한다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>10월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
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
                        <Text style={styles.backText}>도봉구 창동 ‘주공19단지아파트’ 전용 68㎡는 지난 9월 8억1900만원에 등기 이전을 완료했다. 직전가(10억4700만원)에 비해 2억2800만원 떨어졌다. 재건축 호재에도 2년 전인 지난 2020년 11월 실거래가 수준으로 회귀했다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-neutral" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>비슷한 기간 서대문구 남가좌동 ‘DMC파크뷰자이’ 전용 59㎡(10억원→9억원)와 강서구 마곡동 ‘힐스테이트마스터’ 전용 59㎡(10억3250만원→9억8000만원)의 매매가 차이도 줄어들었다. 집값 급등기 이전으로 돌아가고 있는 것이다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-sad" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>KB부동산에 따르면 서울 아파트 매매가는 지난 1월부터 10월까지 0.37% 떨어졌다. 지역별로는 강북권(-0.89%)이 강남권(0.09%) 대비 약세가 두드러졌다. 도봉구(-2.71%), 노원구(-2.34%), 성북구(-1.74%), 동대문구(-1.25%), 강동구(-0.95%) 등의 낙폭이 컸다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}

          {/*----------------------------<moon>-------------------------------  */}
          <Text style={styles.moonText}>9월</Text>
          <View style={styles.cardContainer}>
            <SafeAreaView>
              {/* 가로 스크롤 뷰 */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scrollView} >

                {/*----------------------------<day>------------------------------  */}
                  {/* 카드 버튼이벤트 */}
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
                        <Text style={styles.backText}>중저가 아파트 단지가 많은 강북권을 중심으로 10억원대가 빠르게 붕괴되고 있다. 서울 강북지역 아파트 평균 매매가는 9억9576만원으로 집계됐다. 지난 2월(10억487만원) 이후 8개월 만에 10억원선을 내줬다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-neutral" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>복수의 부동산업계 관게자는 “한두 건 거래된 급매물의 가격을 시세로 치부하기에는 무리가 있다”면서도 “가격 메리트가 없는 이상 거래가 거의 이뤄지지 않는 매수자 우위 시장이 형성된 상황이라 당분간 이러한 분위기가 지속될 것”이라고 전망했다.</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

                {/*----------------------------<day>------------------------------  */}
                {/* 카드 버튼이벤트 */}
                  <TouchableOpacity onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>

                    {/* 앞면 */}
                    <Animated.View
                      style={{ ...styles.front, ...flipToFrontStyle}}>
                      <Entypo name="emoji-sad" size={35} color="white" />
                      <Text style={styles.backText}>title</Text>
                    </Animated.View>

                    {/* 뒷면 */}
                    <Animated.View
                      style={{ ...styles.back, ...flipToBackStyle }}>
                      <View style={styles.backTextView}>
                        <Text style={styles.backText}>서울 아파트 ‘10억 클럽’ 줄이탈...역세권 관심단지도 수억씩 뚝뚝이가람 기자 r2ver@mk.co.kr입력 :  2022-11-23 10:58:26 수정 :  2022-11-23 10:59:06</Text>
                      </View>
                      <TouchableOpacity>
                      <Ionicons style={styles.backBtn} name="list-circle-outline" size={45} color="white" />
                      </TouchableOpacity>
                    </Animated.View>
                  
                </TouchableOpacity>
                {/*----------------------------</day>-----------------------------  */}

              </ScrollView>
            </SafeAreaView>
          </View>
          {/*----------------------------</moon>------------------------------  */}
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>

);
}

export default DiaryScreen;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#071D3A',
    flex: 1,
  },

  year: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yearText: {
    color: "#fff"
  },

  moon: {
    marginTop: 8,
  },

  moonText: {
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
    color: "#fff",
    fontSize: 24,
  },

  scrollView: {
    marginBottom: 16,
  },

  cardContainer: {
    height: SCREEN_HEIGHT / 3,
  },

  front: {
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

});