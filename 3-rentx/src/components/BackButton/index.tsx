import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { useNavigation } from '../../hooks/useNavigation';

import { Container } from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color }: Props) {
  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <Container onPress={handleGoBack}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
