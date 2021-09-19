import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';

import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { useNavigation } from '../../hooks/useNavigation';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImage,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface RouteParams {
  car: CarDTO;
}

export function CarDetails() {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, 200],
      [200, 70],
      Extrapolate.CLAMP
    ),
  }));
  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 150],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  function handleChooseSchedule() {
    navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton />
        </Header>

        <Animated.View
          style={sliderCarsStyleAnimation}
        >
          <CarImage>
            <ImageSlider imagesUrls={car.photos} />
          </CarImage>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          onPress={handleChooseSchedule}
          title="Escolher período do aluguel"
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})
