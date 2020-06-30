import React, { useEffect, useState } from 'react';
import { View, Text, Spinner } from 'native-base';
import { typography } from 'styles';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { Home } from '../types/Home';
import { LiveMeasurement } from '../types/LiveMeasurement';
import CircularChart from './CircularChart';
import material from '../../../native-base-theme/variables/material';
import { useTibber } from '../TibberProvider';

const GET_CONSUMPTION = gql`
  {
    viewer {
      homes {
        consumption(resolution: HOURLY, last: 100) {
          nodes {
            from
            to
            cost
            unitPrice
            unitPriceVAT
            consumption
            consumptionUnit
          }
        }
      }
    }
  }
`;

const GET_HOMES = gql`
  query homes {
    viewer {
      homes {
        id
      }
    }
  }
`;

const GET_LIVE_MEASUREMENT = gql`
  subscription LiveMeasurement($homeId: ID!) {
    liveMeasurement(homeId: $homeId) {
      timestamp
      power
      accumulatedConsumption
      accumulatedCost
      currency
      minPower
      averagePower
      maxPower
    }
  }
`;

const TibberLiveConsumption = (): JSX.Element => {
  const { accessToken } = useTibber();
  const homesQuery = useQuery(GET_HOMES);
  const [liveMeasurement, setLiveMeasurement] = useState<LiveMeasurement>();
  const [homes, setHomes] = useState<Home[]>([]);
  const [homeId, setHomeId] = useState<string>();

  useEffect(() => {
    homesQuery.subscribeToMore({
      document: GET_LIVE_MEASUREMENT,
      variables: {
        homeId: homeId,
      },
      onError: (error) => {
        console.warn(error);
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData?.data?.liveMeasurement) {
          setLiveMeasurement(subscriptionData.data.liveMeasurement);
        }
      },
    });
  }, [homeId]);

  useEffect(() => {
    if (homes.length > 0) {
      if (homeId !== homes[0].id) {
        setHomeId(homes[0].id);
      }
    }
  }, [homes]);
  useEffect(() => {
    if (homesQuery?.data && homesQuery.data?.viewer?.homes) {
      setHomes(homesQuery.data.viewer.homes);
    }
  }, [homesQuery.data]);

  const formatNumber = (num: number) => {
    return String(num).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
  };

  return (
    <View>
      {accessToken !== '' ? (
        <View style={{ backgroundColor: material.brandPrimary }}>
          {homesQuery.loading || liveMeasurement?.power === undefined ? (
            <View>
              <Spinner color="white" />
            </View>
          ) : (
            <View style={{ height: 140, padding: 20 }}>
              {liveMeasurement?.power && (
                <CircularChart
                  size={100}
                  value={liveMeasurement?.power}
                  range={[0, 8000]}
                >
                  <Text style={{ ...typography.textWhite }}>
                    <Text
                      style={{
                        ...typography.textBold,
                        ...typography.textWhite,
                      }}
                    >
                      {formatNumber(liveMeasurement?.power)}
                    </Text>{' '}
                    w
                  </Text>
                </CircularChart>
              )}
            </View>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
export default TibberLiveConsumption;
