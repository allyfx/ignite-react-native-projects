import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '../../hooks/useNavigation';
import { useTheme } from 'styled-components';

import { Car } from '../../components/Car';
import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';

import { CarDTO } from '../../dtos/CarDTO';

import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const { goBack } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1');
        setCars(data);
      } catch (error) {
        console.log(error);
        Alert.alert('Ocorreu um erro ao tentar listar os agendamentos.');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton
          onPress={goBack}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? <Load /> : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
