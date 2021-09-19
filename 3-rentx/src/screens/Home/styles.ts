import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  padding: 32px 24px;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarsList = styled(
  FlatList as new () => FlatList<CarDTO>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
