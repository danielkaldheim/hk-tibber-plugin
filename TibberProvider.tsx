import React, { useContext, useMemo, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

interface Props {
  children: any;
}

const TibberContext = React.createContext({});

export const TibberProvider = (props: Props) => {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem('tibber-access-token').then((data) => {
      if (data) {
        setAccessToken(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tibber-access-token', JSON.stringify(accessToken));
  }, [accessToken]);

  const value = useMemo(() => {
    return { accessToken, setAccessToken };
  }, [accessToken]);

  return (
    <TibberContext.Provider value={value}>
      {props.children}
    </TibberContext.Provider>
  );
};

const useTibber: any = () => useContext(TibberContext);
export { TibberContext, useTibber };
export default TibberProvider;
