import React, { useEffect, useState } from 'react';
import { useTibber } from '../TibberProvider';
import { Text, View, Button, Form, Input, Item, Label } from 'native-base';
import { typography } from 'styles';
import { StyleSheet, Clipboard } from 'react-native';
import material from '../../../native-base-theme/variables/material';
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  title: {
    ...typography.textLight,
    marginBottom: 20,
  },
  inlineLink: {
    color: material.brandPrimary,
  },
});

const SetupTibber = (): JSX.Element => {
  const { accessToken, setAccessToken } = useTibber();
  const [inputAccessToken, setInputAccessToken] = useState<string>(accessToken);

  useEffect(() => {
    if (accessToken !== inputAccessToken) {
      setInputAccessToken(accessToken);
    }
  }, [accessToken]);

  const save = () => {
    setAccessToken(inputAccessToken);
  };

  return (
    <View>
      <View>
        <Text style={{ paddingBottom: 20 }}>
          For å bruke denne utvidelsen må du få hente tilgangstoken fra{' '}
          <Text
            style={[styles.inlineLink]}
            onPress={() => {
              WebBrowser.openBrowserAsync('https://developer.tibber.com', {
                enableBarCollapsing: true,
              }).then(() => {
                Clipboard.getString().then((value) => {
                  const isToken = /^[\w\d]+$/.test(value);
                  if (value.length >= 64 && isToken) {
                    setInputAccessToken(value);
                    save();
                  }
                });
              });
            }}
            accessibilityLabel="Lenke til utvikler portal til Tibber"
          >
            utvikler protalen til Tibber
          </Text>
          .
        </Text>
        <Text style={{ paddingBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
          Steg:
        </Text>
        <Text>1. Klikk på lenken</Text>
        <Text>2. Logg inn</Text>
        <Text>3. Klikk på menypunktet "Authorization"</Text>
        <Text>
          4. Klikk på "Copy to Clipboard" under tittelen "Access Token"
        </Text>
        <Text>5. Lukk nettleseren og lim inn i tekstfeltet under:</Text>
      </View>
      <View>
        <Form>
          <Item floatingLabel last>
            <Label>Tilgangstoken</Label>
            <Input
              accessibilityLabel="Felt for tilgangstoken fra Tibber"
              value={inputAccessToken}
              onChangeText={setInputAccessToken}
            />
          </Item>
        </Form>
      </View>
      <View>
        <Button
          primary
          disabled={inputAccessToken.length < 64}
          style={{ marginTop: 40, justifyContent: 'center' }}
          onPress={save}
          accessibilityLabel="Lagre tilgangstoken fra tibber"
        >
          <Text>Lagre</Text>
        </Button>
      </View>
    </View>
  );
};
export default SetupTibber;
