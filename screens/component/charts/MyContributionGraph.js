import React, { useEffect, useState } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function MyContributionGraph(props) {
    const [date, setDate] = useState(new Date())

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ContributionGraph
                values={[
                    { date: '2022-11-02', count: 5 },
                    { date: '2022-11-03', count: 5 },
                    { date: '2022-11-04', count: 5 },
                    { date: '2022-11-05', count: 5 },
                    { date: '2022-11-06', count: 5 },
                    { date: '2022-11-30', count: 5 },
                    { date: '2022-12-01', count: 5 },
                    { date: '2022-12-03', count: 5 },
                    { date: '2022-12-05', count: 5 },
                    { date: '2022-12-07', count: 5 },
                    { date: '2022-12-08', count: 5 },
                    { date: '2022-12-14', count: 5 },
                ]}

                endDate={date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}
                numDays={105}

                width={SCREEN_WIDTH/1.05} 
                height={SCREEN_HEIGHT/4}

                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(51, 184, 100, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
            />
        </View>
    );
}

export default MyContributionGraph;