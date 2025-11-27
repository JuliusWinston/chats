// GroupsIcon.tsx
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const GroupsIcon: React.FC<Props> = ({ width = 28, height = 28, color = 'black' }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx={9} cy={7} r={4} />
    <Circle cx={17} cy={9} r={3} />
    <Path d="M2 21v-1a6 6 0 0 1 12 0v1" />
    <Path d="M14 21v-1a4.5 4.5 0 0 1 9 0v1" />
  </Svg>
);
