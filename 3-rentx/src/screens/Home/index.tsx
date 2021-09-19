import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { useNavigation } from '../../hooks/useNavigation';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { CarDTO } from '../../dtos/CarDTO';

import LogoSvg from '../../assets/logo.svg';

import api from '../../services/api';

import {
  Container,
  Header,
  TotalCars,
  CarsList
} from './styles';

export function Home() {
  const { navigate } = useNavigation();

  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: positionX.value},
      {translateY: positionY.value}
    ]
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [carData, setCarData] = useState<CarDTO[]>([]);

  function handleCarDetail(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  async function getData() {
    try {
      const { data } = await api.get('/cars');

      setCarData(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro ao listar os carros.');
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Container>
      <Header>
        <LogoSvg
          width={RFValue(108)}
          height={RFValue(12)}
        />

        {!isLoading && (
          <TotalCars>
            Total de {carData.length} carros
          </TotalCars>
        )}
      </Header>

      {isLoading ? <Load /> : (
        <CarsList
          data={carData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Car
              onPress={() => handleCarDetail(item)}
              data={item}
            />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              }
            ]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
