import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';

import { useNavigation } from '../../hooks/useNavigation';

import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface RouteParams {
  car: CarDTO;
}

export function Scheduling() {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleConfirm() {
    navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates).map(date =>
        format(getPlatformDate(new Date(date)), 'yyyy-MM-dd')),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const allDates = Object.keys(interval);

    const firstDate = allDates[0];
    const lastDate = allDates[allDates.length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
      <Header>
        <BackButton
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          onDayPress={handleChangeDate}
          markedDates={markedDates}
        />
      </Content>

      <Footer>
        <Button
          onPress={handleConfirm}
          title="Confirmar"
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
