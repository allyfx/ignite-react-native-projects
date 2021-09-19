import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';

import { useTheme } from 'styled-components';

import { getPlatformDate } from '../../utils/getPlatformDate';

import { useNavigation } from '../../hooks/useNavigation';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

import api from '../../services/api';

import {
  Container,
  Header,
  CarImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface RouteParams {
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails() {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;

  const [loading, setLoading] = useState(false);

  function formatDate(date: string) {
    return format(getPlatformDate(new Date(date)), 'dd/MM/yyyy');
  }

  async function handleRental() {
    setLoading(true);

    try {
      const schedulesByCar = await api.get(`schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: formatDate(unavailable_dates[0]),
        endDate: formatDate(unavailable_dates[unavailable_dates.length - 1]),
      });

      await api.put(`schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });
  
      navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert('Não foi possível realizar o agendamento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImage>
        <ImageSlider imagesUrls={car.photos} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>
              {formatDate(dates[0])}
            </DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>
              {formatDate(dates[dates.length - 1])}
            </DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {car.rent.price * dates.length}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          onPress={handleRental}
          color={theme.colors.success}
          title="Alugar agora"
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
