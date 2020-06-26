import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { typography } from 'styles';

const styles = StyleSheet.create({
  // text: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // consumption: {
  //   ...typography.textWhite,
  //   ...typography.textMedium,
  //   marginTop: 5,
  //   opacity: 0.75,
  //   fontSize: 18,
  // },
  // consumptionUnit: {
  //   ...typography.textWhite,
  //   ...typography.textMedium,
  //   opacity: 0.75,
  //   fontSize: 12,
  // },
});

const LiveMeasurementCard = (): JSX.Element => {
  return (
    <View>
      <Text style={typography.textWhite}>Live measurements</Text>
    </View>
  );
};
export default LiveMeasurementCard;
