import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: 355px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(34)}px;

  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  margin: 32px 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(10)}px;
`;

type DateValueProps = {
  selected: boolean;
}

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;

  padding-bottom: 3px;

  ${({ selected, theme }) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  padding: 24px;
  padding-bottom: ${getBottomSpace() + 24}px;
`;
