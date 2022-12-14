import React, { useEffect, useState } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function MyBarChart(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <BarChart
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                        {
                            data: [0, 5, 10, 15, 20, 25],
                        },
                    ],
                }}

                width={SCREEN_WIDTH/1.05} 
                height={SCREEN_HEIGHT/4}

                chartConfig={{
                    backgroundColor: '#1cc910',
                    //배경 색
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',

                    fillShadowGradientOpacity: 0.8,
                    
                    decimalPlaces: 2,
                    // 막대 색
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