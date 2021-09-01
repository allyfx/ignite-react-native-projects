import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;
  height: 200px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
`;

type IconProps = {
  type: 'up' | 'down' | 'total';
}

const colors = {
  up: theme.colors.success,
  down: theme.colors.attention,
  total: theme.colors.primary
}

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ type }) => colors[type]};
`;

export const Content = styled.View``;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  line-height: 48px;

  color: ${({ theme }) => theme.colors.title};
  margin-top: 35px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  line-height: 18px;

  color: ${({ theme }) => theme.colors.text};
`;

