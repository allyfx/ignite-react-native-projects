import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Text
} from './styles';

interface Props extends TouchableOpacityProps {
  title?: string;
};

export function Button({ title, ...props }: Props) {
  return (
    <Container activeOpacity={0.8} {...props}>
      <Text>{title}</Text>
    </Container>
  );
}
