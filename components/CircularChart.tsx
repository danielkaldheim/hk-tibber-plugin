import React, { useEffect } from 'react';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
  interpolate,
  multiply,
  Easing,
} from 'react-native-reanimated';
import material from '../../../native-base-theme/variables/material';
import { View } from 'native-base';
import { timing } from 'react-native-redash';
import { NavigationStackProp } from 'react-navigation-stack';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  size: number;
  value: number;
  range: [number, number];
  children?: React.ReactNode;
  navigation?: NavigationStackProp;
};

const CircularChart = (props: Props) => {
  const { size, value, range, children } = props;
  const valueRef = React.useRef(0);

  const strokeWidth = size / 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const config = {
    duration: 300,
    from: valueRef.current,
    to: value,
    easing: Easing.ease,
  };
  const alpha = interpolate(timing(config), {
    inputRange: range,
    outputRange: [Math.PI * 2, 0],
  });
  const strokeDashoffset = multiply(alpha, radius);

  useEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, [value]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: '270deg' }], flex: 1 }}
      >
        <Circle
          stroke={material.brandInfo}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />
        {value && (
          <AnimatedCircle
            stroke={material.brandLight}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            {...{ strokeWidth, strokeDashoffset }}
          />
        )}
      </Svg>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // borderRadius: '50%',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CircularChart;
