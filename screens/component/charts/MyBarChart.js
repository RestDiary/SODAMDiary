import React, { useEffect, useState } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function MyBarChart(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <BarChart
                data={{
                    labels: [props.data[0].keyword, props.data[1].keyword, props.data[2].keyword, props.data[3].keyword, props.data[4].keyword],
                    datasets: [
                        {
                            data: [props.data[0].cnt, props.data[1].cnt, props.data[2].cnt, props.data[3].cnt, props.data[4].cnt],
                        },
                    ],
                }}

                width={SCREEN_WIDTH/1.05} 
                height={SCREEN_HEIGHT/4}

                showValuesOnTopOfBars={true}
                fromZero={true}

                chartConfig={{
                    backgroundColor: '#1cc910',
                    //배경 색
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',

                    //막대 색
                    fillShadowGradientOpacity: 0.8, //투명도
                    fillShadowGradientFrom : 'blue',
                    
                    //소수점
                    decimalPlaces: 0,

                    // 레이블, 전체적인 색
                    color: (opacity = 1) => `rgba(2, 55, 55, ${opacity})`,
                    
                    style: {
                        borderRadius: 16,
                    },
                }}
                
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
}

export default MyBarChart;