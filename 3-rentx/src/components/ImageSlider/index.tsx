import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CardImageWrapper,
  CardImage,
} from './styles';

interface Props {
  imagesUrls: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrls }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrls.map((_, index) => (
          <ImageIndex key={index} active={imageIndex === index} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrls}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CardImageWrapper>
            <CardImage
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CardImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
