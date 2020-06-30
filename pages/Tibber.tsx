import React, { useEffect } from 'react';
import TibberProvider, { useTibber } from '../TibberProvider';
import { H1, View, Container } from 'native-base';
import SetupTibber from '../components/SetupTibber';
import { StyleSheet } from 'react-native';
import { typography } from 'styles';
import TibberLogo from '../assets/TibberLogo';
import TibberLiveConsumption from '../components/TibberLiveConsumption';

const styles = StyleSheet.create({
  title: {
    ...typography.textLight,
    marginBottom: 20,
  },
});

const Tibber = (): JSX.Element => {
  return (
    <TibberProvider>
      <Container style={{ padding: 20 }}>
        <View>
          <View style={{ marginBottom: 20 }}>
            <TibberLogo />
          </View>
          <TibberLiveConsumption />
          <SetupTibber />
        </View>
      </Container>
    </TibberProvider>
  );
};
export default Tibber;
