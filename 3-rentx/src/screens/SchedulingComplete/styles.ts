import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  padding-top: 96px;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 40px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_details};

  text-align: center;
  line-height: ${RFValue(25)}px;

  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;

  align-items: center;

  margin: 70px 0;
`;
