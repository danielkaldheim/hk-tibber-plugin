import React from 'react';
import TibberProvider from '../TibberProvider';
import { H1, View, Container } from 'native-base';
import SetupTibber from './SetupTibber';
import { StyleSheet } from 'react-native';
import { typography } from 'styles';

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
          <H1 style={styles.title}>Tibber</H1>
          <SetupTibber />
        </View>
      </Container>
    </TibberProvider>
  );
};
export default Tibber;
