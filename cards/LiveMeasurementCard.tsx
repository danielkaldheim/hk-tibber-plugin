import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import TibberProvider from '../TibberProvider';
import TibberLiveConsumption from '../components/TibberLiveConsumption';

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
  // useEffect(() => {
  //   console.log('LiveMeasurementCard');
  // }, []);

  return (
    <TibberProvider>
      <TibberLiveConsumption />
    </TibberProvider>
  );
};
export default LiveMeasurementCard;
